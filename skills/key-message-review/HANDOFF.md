# Handoff — 关键信息体检（关键信息体检 skill）

只记**事实**：文件构成、各管什么、怎么验证。要读"为什么"看 `PRODUCT.md`。

最后更新：v0.1.0（首版骨架）

## 目录结构

```
key-message-review/
├── SKILL.md                  # 入口：4步工作流 + 三档 + 评级 + references索引 + 红线
├── PRODUCT.md                # 为什么：解决"看不出自己在说正确的废话"
├── HANDOFF.md                # 本文件
├── 能力圈.md                  # 做什么 / 不做什么 + NON-NEGOTIABLE
├── EXTEND.example.md         # 用户偏好模板（复制为 EXTEND.md 填真实数据/禁用词）
├── references/               # 方法内核，按需加载
│   ├── 大词虚词黑名单.md       #   扫空话三类 + 改写方向
│   ├── 有效信息三要素.md       #   具体病人 / 可记一句话 / 医生动作 + 主信息结构
│   ├── 策略可执行性检验.md     #   主谓宾还原法，判定定位虚不虚
│   ├── 合规红线.md            #   绝对化/裸数据/超适应症/禁用词 7 条
│   ├── 视觉信息权重倒挂.md     #   展架/海报/slide 专用：大字玻璃珠、脚注藏钻石
│   └── 评分卡.md             #   及格/良好/优秀 判定 + 固定输出格式
├── assets/
│   ├── compare-card.html     # 对比卡模板：Guizang Swiss 数据驱动（accent 可切；改后支持 diamond/supports 两结构）
│   └── report.html           # 交互式体检报告页模板：暖编辑风数据驱动（评级+挑刺accordion+改前后+成品+IP lockup）
├── scripts/
│   ├── render-card.mjs       # 把对比卡 HTML 渲染成 PNG（playwright）
│   └── render-report.mjs     # 把体检报告渲染成自包含交互 HTML（可选 --png 截长图；头像自动 base64 内嵌）
├── examples/
│   ├── 络平宁-高血压-样张.md   # 全脱敏样张（虚构降压药，跑完 4 步）
│   ├── 络平宁-card.json       # 对比卡数据，喂给 render-card.mjs
│   ├── 络平宁-report.json     # 体检报告数据（REPORT_DATA），喂给 render-report.mjs
│   └── 络平宁-体检报告.html    # 生成的交互报告样张（可直接打开看）
└── _private/                 # ⚠ 内部产物，.gitignore，不打包不发布
                              #   （如竞品分析对比卡——含真实竞品衍生内容，不可对外）
```

> **对外 / 内部分界**：`examples/` 只放虚构产品、可公开；真实竞品/客户衍生的产出一律进 `_private/`，由 `.gitignore` 挡住，不随产品分发。

## 脱敏铁律（改文件时必守）

1. **零私域来源信息**：无任何方法论来源人名、无招牌比喻、无可追溯案例。
2. **示例只用虚构产品**，且避开东家真实管线领域（当前用高血压）。
3. 方法表述均为原创，非复制私域文档。

## 怎么验证

- 内容自检：全仓不得出现任何方法论来源人名（人工抽查 + 内部维护一份私有禁词表，不写入仓库）。
- 对比卡：`cd examples && node ../scripts/render-card.mjs 络平宁-card.json out.png`，应生成 1080×1440 PNG（Swiss 风），文字清晰、改前灰色删除线、改后强调色，**页脚不被裁切**。
- 对比卡溢出自检：content scrollHeight 应 ≤ 1440（内容多时优先精简文案，勿超）。
- 报告页：`node scripts/render-report.mjs examples/络平宁-report.json examples/络平宁-体检报告.html`，浏览器打开应见：评级结论先行、挑刺 accordion 可展开、合规雷标红、改前→改后正确、成品可折叠、右上+右下 IP lockup 齐、头像 base64（非 file://）、MA/RA 免责在底。
- 依赖：render 需 playwright（仅对比卡 PNG / 报告 --png 用）；无则自动回退系统 Chrome（脚本已内置）。报告页主产出是纯 HTML，**无 playwright 也能出**。

## 已完成（v0.1 → v0.2）

- [x] 对比卡固化为 Guizang **Swiss 数据驱动模板**（替换原朴素 HTML）；强调色可切；改后支持 diamond/supports 两结构。风格探索版(A 蓝 / B 橙)留在 `_private/guizang-card/`。
- [x] 修复默认值逐字段渗透 bug（传 CARD_DATA 时整体覆盖，不再渗透虚构默认）。
- [x] 加个人 IP 品牌签名（`brand`/`brandSeries`/`brandTag`，竖条+两行）；**公开卡署名，竞品卡不传 brand=自动不署名**。最终文案：线1「MKTer 小V Skill」线2「关键信息体检 · 一起进化」。
- [x] 视觉定稿：**改前灰块 / 改后淡蓝块（C 双色块区隔）+ 深蓝金句**（与"优秀"徽章同色，改后统一"蓝=答案"）。`footer` 合规小字改为可选（传才显示，公开卡不带）。`.support` 与改前 `.body` 同间距（gap-4/行高1.6）。修了 `.support` 漏 margin:0、brandSeries 空串顶默认两处 bug。

## v0.3（新用户体验）

- [x] SKILL.md 加「首次引导」段：被触发但无内容时给固定开场(自我介绍+填空模板+三档轻提示+免责),不甩字段名。
- [x] 放松 EXTEND 门槛:体检/挑刺零配置可跑;只有改写/撰写前才收产品上下文+禁用词(不再一上来强制配置)。

## v0.3.1（照 skill 制作 SOP 自检后的实用性优化）

- [x] **A 输入分类→自动调档表**:一句message=速检 / 方案=深档 / 展架海报=标准+视觉倒挂检查。
- [x] **B 输出元数据**:体检报告顶部带 `[产品/适应症·日期·档位·评级]`,可归档可对比。
- [x] **C 每条挑刺必引原句**(硬规则):「原句」→问题→其实想说什么,不准只说"有大词"。
- [x] **D 存疑就查不编**:外部可变事实(竞品/获批/指南)不确定 → 触发 web 核实或标 [待核实]。

## v0.3.2（新增交互式体检报告页 · 第三种输出）

- [x] **交互式体检报告页**（`assets/report.html` + `scripts/render-report.mjs`）：整份体检做成自包含交互 HTML（评级结论先行 / 逐条挑刺 accordion 可展开 / 改前→改后 / 成品可折叠）。视觉继承 MKTer 小V 暖编辑风设计系统（`brand/templates/交易物落地页-模板.html`），符合 SOP §6 门面走 baoyu-design 设计系统。
- [x] REPORT_DATA = CARD_DATA 超集（复用 before/after，加 meta/verdict/flaws/product）；头像自动 base64 内嵌（避 file://，SOP §8）；不传 brand 不署名（同对比卡铁律，竞品报告进 _private/）。
- [x] **回归用例**（SOP §8 测试关）：`examples/络平宁-report.json`（标准档）+ `tests/优秀档-空挑刺.json`（空 flaws/null product 自动隐藏段）+ `tests/全大词-不及格.json`（多条合规雷标红）。三档评级徽章配色、空字段健壮性均经 CDP 实测通过。
- 区别于对比卡：对比卡=单张定格图（传播用），报告页=完整可交互交付物（深档默认带，正式交活用）。

## 待办

- [ ] **E template 版 + 完整版 + 团队版字段**(v0.4,把工具升成"能筛负责人客户"的产品)。

- [ ] **团队版字段**(Codex round2 建议,商业化关键):每个 skill 内置"任务场景 / 复核人 / 风险边界 / 省多少时间 / 推广条件"——让轻端产品兼当重端"负责人"筛子。可做进 EXTEND 或深档输出。
- [ ] 对外叙事持续弱化"医生材料撰写"、强化"体检·挑刺·合规·判断校准"(在职合规观感)。

- [ ] EXTEND.md schema 细化 + 首次配置交互文案
- [ ] 对比卡增加横版（公众号 21:9 / 1:1）尺寸
- [ ] examples 增加第二个领域（他汀/降糖）防止单一
- [ ] 可选：装饰封面用文生图（仅题图，不碰正文）
