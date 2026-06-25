#!/bin/bash
# 体检系列一键安装:把 skills/ 下的每个 skill 复制到你的 skills 目录
set -e
DEST="${1:-$HOME/.claude/skills}"
mkdir -p "$DEST"
HERE="$(cd "$(dirname "$0")" && pwd)"
n=0
for d in "$HERE"/skills/*/; do
  name="$(basename "$d")"
  rm -rf "$DEST/$name"
  cp -R "$d" "$DEST/$name"
  echo "✓ 已安装 $name → $DEST/$name"
  n=$((n+1))
done
echo "—— 共装好 $n 个体检 skill。重启/重载你的 AI 工具即可使用。"
