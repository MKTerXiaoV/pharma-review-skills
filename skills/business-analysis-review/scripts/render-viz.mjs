// 业务分析体检 · 可视化改前→改后(深案例"涨了≠你赢了" · baoyu craft · 价值口径)
// 用法:node scripts/render-viz.mjs <data.json> <out.png>
import { chromium } from '/Users/vera/.claude/skills/guizang-social-card-skill/node_modules/playwright/index.mjs';
import { readFileSync } from 'fs';
const [,, dataPath, outPath] = process.argv;
const d = JSON.parse(readFileSync(dataPath, 'utf8'));
const ava = (()=>{ try { return 'data:image/png;base64,'+readFileSync(new URL('../assets/avatar.png', import.meta.url)).toString('base64'); } catch { return ''; } })();
const W=1160, H=1330;
const sc = d.shareChart; // {you, market, shareFrom, shareTo}
const maxg = Math.max(sc.you, sc.market);
const bh = v => v/maxg*150;
const flags = (d.flags||[]).map(f=>`<div class="flag"><span class="fd">🔴</span><div><b>${f.t}</b>${f.s?` · ${f.s}`:''}</div></div>`).join('');
const tags = (d.before.tags||[]).map(t=>`<span class="tg">${t}</span>`).join('');
const html=`<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box;font-family:'PingFang SC','Hiragino Sans GB',sans-serif}
body{width:${W}px;height:${H}px;background:#F5F0E6;position:relative;
 background-image:radial-gradient(rgba(64,59,54,.05) 1px,transparent 1px);background-size:38px 38px}
.pad{padding:56px 60px}
.kick{display:inline-flex;align-items:center;gap:13px;font-size:25px;font-weight:800;letter-spacing:.08em;color:#BE7A4C}
.kick .dot{width:13px;height:13px;border-radius:50%;background:#D4956A}
.hook{font-size:52px;font-weight:800;color:#403B36;line-height:1.18;margin-top:22px;letter-spacing:-.01em}
.hook mark{background:linear-gradient(transparent 55%,#F3E3BE 55%,#F3E3BE 92%,transparent 92%);padding:0 8px}
.cat{font-size:23px;font-weight:700;color:#9a8e80;margin-top:22px}
.row{display:flex;gap:38px;margin-top:34px;align-items:stretch}
.card{flex:1;position:relative;background:#FBF7EE;border:2px solid #EBE2CE;border-radius:30px;padding:34px;box-shadow:0 22px 55px rgba(64,59,54,.08)}
.arrow{align-self:center;font-size:46px;font-weight:800;color:#BE7A4C;flex:0 0 auto}
.tab{display:inline-block;font-size:24px;font-weight:800;padding:11px 24px;border-radius:16px}
.bad .tab{background:#F2E3D9;color:#B0502C}.good .tab{background:#E3EEE4;color:#3F6B53}
/* 改前 */
.big{font-size:96px;font-weight:800;color:#5F8A85;line-height:1;margin:26px 0 6px}
.bigsub{font-size:28px;font-weight:800;color:#403B36}
.tags{margin-top:24px;display:flex;flex-wrap:wrap;gap:12px}
.tg{font-size:23px;font-weight:700;color:#857c70;background:#F2EEE4;border:2px solid #e6ddcc;border-radius:12px;padding:9px 18px}
/* 改后 */
.divtitle{font-size:27px;font-weight:800;color:#B0502C;margin:22px 0 8px}
.flag{display:flex;gap:12px;align-items:flex-start;font-size:22px;font-weight:700;color:#574f45;line-height:1.4;margin-top:14px}
.flag .fd{font-size:18px;margin-top:3px}.flag b{color:#403B36;font-weight:800}
.act{font-size:23px;font-weight:800;color:#3F6B53;background:#E6F0E8;border-radius:16px;padding:18px 20px;margin-top:20px;line-height:1.45}
/* boss + foot */
.boss{display:flex;align-items:center;gap:12px;margin-top:24px;font-size:23px;font-weight:800;padding:18px 22px;border-radius:18px;white-space:nowrap}
.bad .boss{background:#F6E9E1;color:#B0502C}.good .boss{background:#E6F0E8;color:#3F6B53}
.boss .ic{font-size:28px}
.foot{display:flex;justify-content:space-between;align-items:center;margin-top:36px}
.foot .b{display:flex;align-items:center;gap:18px}
.foot img{width:76px;height:76px;border-radius:50%;border:4px solid #fff;box-shadow:0 8px 22px rgba(190,122,76,.28)}
.foot .nm{font-size:29px;font-weight:800;color:#403B36}.foot .se{font-size:22px;font-weight:800;color:#BE7A4C}
.foot .gh{font-size:21px;font-weight:700;color:#857c70;text-align:right;line-height:1.5}.foot .gh b{color:#BE7A4C}
.qlab{font-weight:700;fill:#a99e8d}
</style></head><body><div class="pad">
 <div class="kick"><span class="dot"></span>业务分析体检 · 一起进化</div>
 <div class="hook">你的数据分析,<br>过得了老板那句「<mark>so what?</mark>」吗?</div>
 <div class="cat">${d.category||''}</div>
 <div class="row">
  <div class="card bad">
   <span class="tab">改前 ❌ 只看「涨了」</span>
   <div class="big">+${d.before.big}%</div><div class="bigsub">${d.before.bigsub||'超额完成'}</div>
   <div class="tags">${tags}</div>
   <div class="boss"><span class="ic">🗣</span>${d.before.boss||'涨了挺好,加码?'}</div>
  </div>
  <div class="arrow">→</div>
  <div class="card good">
   <span class="tab">改后 ✅ 读透了</span>
   <svg width="100%" height="208" viewBox="0 0 470 200" style="margin-top:12px">
     <line x1="50" y1="170" x2="320" y2="170" stroke="#e0d6c4" stroke-width="2.5"/>
     <rect x="80" y="${170-bh(sc.you)}" width="64" height="${bh(sc.you)}" rx="8" fill="#D4956A"/>
     <text x="112" y="${170-bh(sc.you)-12}" text-anchor="middle" font-size="22" font-weight="800" fill="#BE7A4C">你 +${sc.you}%</text>
     <rect x="200" y="${170-bh(sc.market)}" width="64" height="${bh(sc.market)}" rx="8" fill="#9a8e80"/>
     <text x="232" y="${170-bh(sc.market)-12}" text-anchor="middle" font-size="22" font-weight="800" fill="#7a7268">市场 +${sc.market}%</text>
     <g transform="translate(350,40)">
       <text x="0" y="0" font-size="22" font-weight="800" fill="#B0502C">份额</text>
       <text x="0" y="40" font-size="34" font-weight="800" fill="#B0502C">${sc.shareFrom}% ↘ ${sc.shareTo}%</text>
       <text x="0" y="74" font-size="19" font-weight="700" fill="#a99e8d">涨了,份额却在丢</text>
     </g>
   </svg>
   <div class="divtitle">体检挖出 3 层:</div>
   ${flags}
   <div class="act">→ ${d.after.action}</div>
   <div class="boss"><span class="ic">🗣</span>${d.after.boss||'这个清楚,就这么干 ✅'}</div>
  </div>
 </div>
 <div class="foot">
  <div class="b">${ava?`<img src="${ava}">`:''}<div><div class="nm">MKTer 小V</div><div class="se">一起进化</div></div></div>
  <div class="gh">开源 Skill「业务分析体检」<br>GitHub 搜 <b>MKTerXiaoV</b></div>
 </div>
</div></body></html>`;
const br=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--no-sandbox']});
const pg=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await pg.setContent(html,{waitUntil:'load'}); await pg.waitForTimeout(300);
await pg.screenshot({path:outPath});
await br.close(); console.log('已生成:',outPath);
