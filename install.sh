#!/bin/bash
# 体检系列一键安装:把 skills/ 下的每个 skill 复制到你的 skills 目录
set -e
DEST="${1:-$HOME/.claude/skills}"
mkdir -p "$DEST"
HERE="$(cd "$(dirname "$0")" && pwd)"
n=0
for d in "$HERE"/skills/*/; do
  name="$(basename "$d")"
  # 保住用户的 EXTEND.md(私人校准,重装不清零)
  extend_bak=""
  if [ -f "$DEST/$name/EXTEND.md" ]; then
    extend_bak="$(mktemp)"
    cp "$DEST/$name/EXTEND.md" "$extend_bak"
  fi
  rm -rf "$DEST/$name"
  cp -R "$d" "$DEST/$name"
  if [ -n "$extend_bak" ]; then
    mv "$extend_bak" "$DEST/$name/EXTEND.md"
    echo "✓ 已安装 $name → $DEST/$name(已保留你的 EXTEND.md)"
  else
    echo "✓ 已安装 $name → $DEST/$name"
  fi
  n=$((n+1))
done
echo "—— 共装好 $n 个体检 skill。重启/重载你的 AI 工具即可使用。"
