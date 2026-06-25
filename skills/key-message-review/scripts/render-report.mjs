#!/usr/bin/env node
/*
 * render-report.mjs — 把"关键信息体检报告"渲染成自包含交互 HTML（可本地开 / 发文件 / 选发 pages.dev）
 *
 *   node scripts/render-report.mjs <data.json> [out.html] [--png]
 *
 * 主产出是 HTML（交互页：挑刺可展开、成品可折叠）。加 --png 时再用 playwright 截一张长图。
 *
 * data.json 结构（REPORT_DATA，CARD_DATA 的超集）：
 * {
 *   "meta":    { "chrome","category","tier","source","date" },          // 元数据条
 *   "verdict": { "grade":"不及格|及格|良好|优秀", "oneline":"一句话总诊断" },
 *   "flaws":   [ { "quote":"原句","problem":"问题","realMeaning":"其实想说","compliance":true } ],
 *   "before":  { "grade","items":[],"note" },                            // 同对比卡
 *   "after":   { "grade","oneliner","field","main","main_one","supports":[] },
 *   "product": { "title","body":[{t:"p",h:".."},{t:"ul",items:[..]}],"checklist","note" },
 *   "brand":"MKTer 小V","brandTag":"一起进化","tagline":"...","footer":"...",
 *   "avatar":""   // 留空则自动取 brand/xhs-avatar-github.png 内嵌为 base64 data URL
 * }
 * 字段缺省回落到模板内置虚构默认（络平宁）。
 *
 * --png 依赖 playwright（脚本自带多路径回退，找不到就只出 HTML 并提示）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const wantPng = args.includes("--png");
const positional = args.filter(a => !a.startsWith("--"));
const [dataPath, outPath = "体检报告.html"] = positional;
if (!dataPath) {
  console.error("用法: node scripts/render-report.mjs <data.json> [out.html] [--png]");
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(here, "..", "assets", "report.html");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// 头像：未显式给 avatar 就自动找 brand 头像内嵌成 data URL（避 file:// 加载失败，SOP §8）
if (!data.avatar) {
  const avatarCandidates = [
    path.join(here, "..", "assets", "avatar.png"),
    "/Users/" + (process.env.USER || "") + "/Documents/MKTer小V事业/brand/xhs-avatar-github.png",
    "/Users/" + (process.env.USER || "") + "/Documents/MKTer小V事业/brand/templates/avatar.png",
  ];
  for (const ap of avatarCandidates) {
    try {
      if (fs.existsSync(ap)) {
        const buf = fs.readFileSync(ap);
        data.avatar = "data:image/png;base64," + buf.toString("base64");
        break;
      }
    } catch {}
  }
}

const template = fs.readFileSync(templatePath, "utf8");
// 注入 REPORT_DATA（放在 </head> 前，先于模板脚本执行）
const html = template.replace(
  "</head>",
  `<script>window.REPORT_DATA = ${JSON.stringify(data)};</script></head>`
);

fs.writeFileSync(path.resolve(outPath), html, "utf8");
console.log("已生成 HTML:", path.resolve(outPath));

if (!wantPng) process.exit(0);

// ---- 可选 PNG 截图（playwright，回退逻辑同 render-card.mjs）----
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
  console.error("缺少 playwright，跳过 PNG（HTML 已生成）。装：npm i -D playwright && npx playwright install chromium");
  process.exit(0);
}

async function launch() {
  try { return await chromium.launch(); } catch (e1) {
    const candidates = [
      { channel: "chrome" },
      { executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" },
      { executablePath: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" },
    ];
    for (const opt of candidates) { try { return await chromium.launch(opt); } catch {} }
    throw e1;
  }
}
const pngPath = path.resolve(outPath).replace(/\.html?$/i, "") + ".png";
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1400 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
await page.waitForTimeout(500);
await page.screenshot({ path: pngPath, fullPage: true });
await browser.close();
console.log("已生成 PNG:", pngPath);
