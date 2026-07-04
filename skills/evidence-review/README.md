# MKTer 小V · 证据体检 Skill

> 医药市场 **证据可溯源体检 + 判断校准** 引擎(体检系列 · 最上游)。
> AI(或人)扒来一堆文献、试验、竞品数据,漂亮、带注册号、像模像样——但**哪些是官方库核过的、哪些是网页搜索猜的、哪些根本没核就当了事实**?进材料之前,先过一道体检。
>
> *A pharma-marketing **evidence-provenance review & judgment-calibration** engine for AI agents. It doesn't gather evidence for you — it audits what you already have: grades every number A/B/C by source, catches web-search numbers dressed as official data, cross-trial comparisons faked as head-to-head, and un-verified figures treated as fact.*

> ⚠️ **v0.1.0 · 免费开源版**——体检系列的 L0 引流版,零配置可跑。

## 为什么要有这道体检

AI 科研工具(Claude Science 这类)有两档:**默认档偷懒走网页搜索,引用看着对、其实不可核;明确命令它调专用库(ClinicalTrials/PubMed)才切进可溯源档。** 多数人拿到的是默认档还不自知,直接把"网页汇总"当"官方核验"往品牌故事、竞品情报、对外材料里塞——这在医药是要出事的:MA/RA 一句"这数哪来的"能让整份材料退回,严重的踩合规。证据体检就是这道拦截。

## 这是什么

一个给 AI 用的**证据可溯源审视引擎**。把一份证据材料(AI 生成的也行)喂给它,它会:

1. **来源分级 A/B/C(招牌)** —— 给每个关键数字打等级:**A** 官方库能点开核的(可用)/ **B** 网页搜索汇总的(待核)/ **C** 无出处疑似生成的(不可用)。
2. **逐条挑刺** —— 必引证据原文:孤儿数字、B 当 A、未核当事实、交叉引用错(同号两用)、虚假精确、跨试验比较伪装成头对头。
3. **给补救 + 评级** —— 及格/良好/优秀(或"不可用,须回核");哪条补出处、哪条降级待核、哪条直接删。
4. **两张清单(深档)** —— ✅ 能进材料的 / ⏳ 核完再用的。
5. **合规一票否决(前置)** —— 超适应症人群证据 / 患者个体数据 / 把未核证据标"已核实"进对外材料,任一命中即拦。

**它只体检,不替你扒证据。** 能不能核由你点开原始来源定,skill 只负责标出"这条溯不到源"。

## 别只查美国库(国产药重点)

A 级官方库分**全球 + 中国**两套。国产药(尤其国产创新药)的注册性数据常只登在中国平台:
- 全球:ClinicalTrials.gov(NCT)· PubMed(PMID/DOI)
- **中国**:药物临床试验登记与信息公示平台 `chinadrugtrials.org.cn`(CTR 登记号)· ChiCTR 中国临床试验注册中心 `chictr.org.cn` · NMPA 药监局 `nmpa.gov.cn`(获批+说明书)

**别因为 ClinicalTrials.gov 上查不到就判 C——先核中国三件套。** 这点舶来工具都不管。

## 怎么用

**作为 Claude Code skill**:放进 `~/.claude/skills/evidence-review/`,把证据整段发给它,说"体检一下"。
**作为通用提示词**:把 `SKILL.md` 粘进任意对话式 AI(细则打折)。
**三档**:速检(能用/不能用)/ 标准(逐条分级+补救)/ 深档(+合规逐条+两张清单)。

### 自定义
复制 `EXTEND.example.md` 为 `EXTEND.md`(已 gitignore,真实信息只留本地):你的产品/BU 口径、禁用词、常查的库。

## 目录
| 文件 | 作用 |
|---|---|
| `SKILL.md` | 入口:六维体检流程 + 来源分级 A/B/C + 三档 |
| `PRODUCT.md` | 市场部视角:什么时候用、怎么用、替你挡什么祸 |
| `references/可溯源判据.md` | 核心刀:A/B/C 判据 + 官方库清单(全球+中国)+ 六失败模式 |
| `references/迭代法.md` | 越用越像你:体检真材料 → 你改 → AI 提炼规则 → 写进 EXTEND |
| `examples/证据体检-样张.md` | 虚构脱敏样张:一份埋了 5 个雷的证据 → 全程体检输出 |
| `tests/test-cases.md` | 发布前必跑的脱敏测试用例 |
| `能力圈.md` | 做什么 / 不做什么 + NON-NEGOTIABLE |

## 与体检系列的关系
体检系列**最上游**(证据溯得到源吗)→ 业务分析体检 → BP 策略体检 → 关键信息体检 → 活动设计体检 → 汇报体检。IP:MKTer 小V ·「一起进化」。

## 合规
只公开来源证据 · 患者个体数据不进 · 不编来源 · 对外材料须经 MA/RA 审核。样张全虚构。
