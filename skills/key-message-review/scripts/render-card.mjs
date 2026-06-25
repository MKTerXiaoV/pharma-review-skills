#!/usr/bin/env node
/*
 * render-card.mjs — 把"改前 vs 改后"对比卡 HTML 渲染成 PNG（文字像素级精确）
 *
 *   node scripts/render-card.mjs <data.json> <out.png>
 *
 * data.json 结构（Guizang Swiss 数据驱动模板）：
 * {
 *   "accent": "ikb",                        // ikb | safety-orange | lemon-green | lemon-yellow
 *   "chromeLeft": "关键信息体检", "chromeRight": "KEY MESSAGE 体检",
 *   "category": "某产品 · 适应症",
 *   "hook": "改前 → 改后",
 *   "before": { "grade": "不及格", "items": ["大词1","大词2"], "note": "脚注一句" },
 *   "after":  { "grade": "优秀",
 *               "diamond": { "num":"25.5", "unit":"个月", "note":"出处占位" },  // 可选：有钻石数字时
 *               "main": "主信息一句",
 *               "supports": ["支撑1","支撑2"],                                  // 可选
 *               "oneliner": "「给医生一句话」" },
 *   "footer": "数据以说明书为准 · 对外材料须经 MA/RA 审核"
 * }
 * 字段缺省会回落到模板内置的虚构默认值。
 *
 * 依赖 playwright。若未安装：npm i -D playwright && npx playwright install chromium
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [dataPath, outPath = "compare-card.png"] = process.argv.slice(2);
if (!dataPath) {
  console.error("用法: node scripts/render-card.mjs <data.json> <out.png>");
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(here, "..", "assets", "compare-card.html");

// 解析 playwright：先试本地安装的裸包，再回退到机器上已有的绝对路径
let chromium;
const pwCandidates = [
  "playwright",
  path.join(here, "..", "node_modules", "playwright", "index.mjs"),
  "/Users/" + (process.env.USER || "") + "/.claude/skills/guizang-social-card-skill/node_modules/playwright/index.mjs",
];
for (const spec of pwCandidates) {
  try {
    const url = spec.startsWith("/") ? pathToFileURL(spec).href : spec;
    ({ chromium } = await import(url));
    if (chromium) break;
  } catch {}
}
if (!chromium) {
  console.error("缺少 playwright。请先安装：\n  npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");
// 在模板里注入 CARD_DATA
const html = template.replace(
  "</head>",
  `<script>window.CARD_DATA = ${JSON.stringify(data)};</script></head>`
);

// 优先用 playwright 自带 chromium；没装就回退到系统 Chrome/Edge
async function launch() {
  try { return await chromium.launch(); } catch (e1) {
    const candidates = [
      { channel: "chrome" },
      { executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" },
      { executablePath: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" },
      { executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" },
      { executablePath: "/usr/bin/google-chrome" },
    ];
    for (const opt of candidates) {
      try { return await chromium.launch(opt); } catch {}
    }
    console.error("无法启动浏览器。请装 chromium：npx playwright install chromium，或安装 Google Chrome。");
    throw e1;
  }
}
const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
await page.waitForTimeout(600); // 等 Web 字体（无网时回落系统字体）
const card = await page.$("#card");          // 只截 poster 元素，避开深色画布背景
await (card || page).screenshot({ path: path.resolve(outPath) });
await browser.close();
console.log("已生成:", path.resolve(outPath));
