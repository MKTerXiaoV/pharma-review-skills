# 体检系列 · 医药市场判断力 skill 全家桶

> **一个链接,一键装齐 3 个 skill。** 不用一个个找、一个个装。
> MKTer 小V · 一起进化 出品。给医药市场人的「判断力体检」开源工具集——别人帮你生成,它帮你**审你的判断够不够好、过不过得了关**。

医药市场最值钱的不是"会用 AI 生成",是**判断力**:一句关键信息推不推得出医生动作、一个活动锁不锁策略、一份数据分析读没读透。这套 skill 把这些判断**体检 + 校准**,做判断,不替你做。

## 🩺 三个体检 skill

| skill | 一句话 | 单独仓库 |
|---|---|---|
| **关键信息体检** `key-message-review` | 审你的产品关键信息:大词虚词?推不推得出医生动作?合规雷?逐句挑刺 + 改写 | [repo](https://github.com/MKTerXiaoV/key-message-review) |
| **活动设计体检** `activity-design-review` | 审一份学术活动/会议/论坛:锁不锁策略、有没有业务感、客户体验正负 | [repo](https://github.com/MKTerXiaoV/activity-design-review) |
| **业务分析体检** `business-analysis-review` | 审一份数据/业务分析:读得够不够深、源全没、有没有误读——**过得了老板那句 so what 吗** | [repo](https://github.com/MKTerXiaoV/business-analysis-review) |

> 母题一致:判断力被 agent 流程化。单个是砖,三个连起来是市场人的**判断流水线**。

> 🆕 **评审团增强档**:三个 skill 都支持——说"上评审团",多位评委按透镜**盲审** + 反驳者**对抗验证** + 主笔合成(实测同一份方案:单次体检 4 条挑刺 → 评审团 16 条)。需多智能体环境(如 Claude Code),单对话自动降级;消耗约标准档 30–50 倍,只建议用在正式过评审/过老板的材料上。各仓 `references/评审团协议.md` 有完整协议。

## 🚀 一键安装

**最简单(把这段甩给你的 AI agent):**
> 帮我 clone https://github.com/MKTerXiaoV/pharma-review-skills ,把里面 `skills/` 下的每个文件夹放进我的 skills 目录(Claude Code 是 `~/.claude/skills/`),然后我就能用「关键信息体检 / 活动设计体检 / 业务分析体检」了。

**自己装(Claude Code / 任意支持 Agent Skills 的工具):**
```bash
git clone https://github.com/MKTerXiaoV/pharma-review-skills
cd pharma-review-skills
./install.sh                      # 默认装到 ~/.claude/skills/
# 或指定目录:./install.sh ~/.agents/skills
```
装完跟你的 AI 说"用业务分析体检帮我看看这份区域分析"即可。

**当通用提示词:** 把任意一个 skill 的 `SKILL.md` 内容粘进对话框也能跑(细则不跟进,效果打折)。

## ⭐ 觉得有用?
顺手给个 Star —— 让更多医药市场部同行刷到,也让我知道这条路走得通。

—— MKTer 小V · 一起进化 · GitHub 搜 **MKTerXiaoV**
