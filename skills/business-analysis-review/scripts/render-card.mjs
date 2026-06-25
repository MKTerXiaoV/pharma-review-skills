#!/usr/bin/env node
/*
 * render-card.mjs — 自包含"改前 vs 改后"对比卡 (Swiss 风, 不依赖外部模板)
 *   node scripts/render-card.mjs <data.json> <out.png>
 * data.json schema: accent/chromeLeft/chromeRight/category/hook/before/after/brand/brandTag/footer
 * 头像可选:若仓库内存在 assets/avatar.png 则 base64 内嵌显示,否则不渲染头像。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [dataPath, outPath = "card.png"] = process.argv.slice(2);
if (!dataPath) { console.error("用法: node render-card.mjs <data.json> <out.png>"); process.exit(1); }
const d = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const AVA = path.join(REPO, "assets", "avatar.png");
const avaB64 = fs.existsSync(AVA) ? "data:image/png;base64," + fs.readFileSync(AVA).toString("base64") : "";

const ACCENTS = { "ikb":"#1B50C8", "safety-orange":"#E8943A", "lemon-green":"#8CA80E", "lemon-yellow":"#C9A227" };
const accent = ACCENTS[d.accent] || "#E8943A";
const esc = s => String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

const b = d.before || {}, a = d.after || {};
const items = (b.items||[]).map(x=>`<div class="item">${esc(x)}</div>`).join("");
const sup = (a.supports||[]).map(x=>`<div class="sup">▸ ${esc(x)}</div>`).join("");

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
:root{--ink:#1c2630;--g1:#f1f0ec;--g2:#e4e2db;--g3:#8b8b84;--accent:${accent};
 --mono:ui-monospace,"SF Mono",Menlo,monospace;--zh:"PingFang SC","Noto Sans SC",sans-serif;}
*{margin:0;padding:0;box-sizing:border-box;}
#card{width:1080px;background:#fff;padding:64px 70px 56px;font-family:var(--zh);color:var(--ink);}
.chrome{display:flex;justify-content:space-between;font-family:var(--mono);font-size:22px;color:var(--g3);letter-spacing:.04em;padding-bottom:22px;border-bottom:2px solid var(--ink);}
.chrome .r{letter-spacing:.18em;}
.cat{font-family:var(--mono);font-size:26px;color:var(--accent);font-weight:600;margin:34px 0 6px;}
.hook{font-size:80px;font-weight:300;letter-spacing:.02em;margin-bottom:38px;}
.block{border-radius:20px;padding:38px 42px;margin-bottom:24px;}
.before{background:var(--g1);}
.lab{font-family:var(--mono);font-size:24px;letter-spacing:.06em;color:var(--g3);margin-bottom:20px;display:flex;align-items:center;gap:16px;}
.grade{font-family:var(--zh);font-weight:800;font-size:24px;padding:6px 18px;border-radius:8px;}
.g-bad{background:var(--g2);color:#5b5b54;}
.g-good{background:var(--accent);color:#fff;}
.item{font-size:34px;color:#a7a7a0;text-decoration:line-through;text-decoration-color:#c7c7c0;line-height:1.7;}
.note{font-family:var(--mono);font-size:22px;color:var(--g3);margin-top:18px;}
.after{background:color-mix(in srgb, var(--accent) 12%, #fff);}
.main{font-size:46px;font-weight:800;line-height:1.32;margin-bottom:22px;}
.sup{font-size:28px;color:#3a4550;line-height:1.85;}
.oneliner{margin-top:26px;background:var(--accent);color:#fff;font-size:34px;font-weight:800;padding:26px 32px;border-radius:14px;}
.lemon-dark .oneliner,.lemon-dark .g-good{color:#1c2630;}
.sig{display:flex;align-items:center;gap:22px;margin-top:34px;padding-top:30px;border-top:1px solid var(--g2);}
.sig .ava{width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid var(--accent);flex:none;}
.sig .nm{font-size:34px;font-weight:800;}
.sig .se{font-size:25px;font-weight:800;color:var(--accent);letter-spacing:.08em;margin-top:2px;}
.sig .cta{margin-left:auto;text-align:right;font-family:var(--mono);font-size:21px;color:var(--g3);line-height:1.55;}
.foot{font-family:var(--mono);font-size:21px;color:var(--g3);margin-top:22px;}
</style></head>
<body><div id="card" class="${d.accent==='lemon-green'?'lemon-dark':''}">
  <div class="chrome"><span>${esc(d.chromeLeft)}</span><span class="r">${esc(d.chromeRight)}</span></div>
  <div class="cat">${esc(d.category)}</div>
  <div class="hook">${esc(d.hook||"改前 → 改后")}</div>
  <div class="block before">
    <div class="lab">改前 BEFORE <span class="grade g-bad">${esc(b.grade||"未及格线")}</span></div>
    ${items}
    ${b.note?`<div class="note">${esc(b.note)}</div>`:""}
  </div>
  <div class="block after">
    <div class="lab">改后 AFTER <span class="grade g-good">${esc(a.grade||"优秀")}</span></div>
    <div class="main">${esc(a.main)}</div>
    ${sup}
    ${a.oneliner?`<div class="oneliner">${esc(a.oneliner)}</div>`:""}
  </div>
  <div class="sig">
    ${avaB64?`<img class="ava" src="${avaB64}">`:""}
    <div><div class="nm">${esc(d.brand||"MKTer 小V")}</div><div class="se">${esc(d.brandTag||"一起进化")}</div></div>
    <div class="cta">${esc(d.cta||"开源 Skill「业务分析体检」")}<br>GitHub 搜 MKTerXiaoV</div>
  </div>
  ${d.footer?`<div class="foot">${esc(d.footer)}</div>`:""}
</div></body></html>`;

// playwright 解析顺序:本仓/全局可解析的 playwright → guizang skill 自带副本(若装过)
let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  const PW = path.join(process.env.HOME || "", ".claude/skills/guizang-social-card-skill/node_modules/playwright/index.mjs");
  ({ chromium } = await import(PW));
}
let br; try{br=await chromium.launch();}catch{br=await chromium.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});}
const p = await br.newPage({deviceScaleFactor:2});
await p.setContent(html,{waitUntil:"load"});
await p.waitForTimeout(300);
const el = await p.$("#card");
await el.screenshot({path:outPath});
await br.close();
console.log("已生成:", outPath);
