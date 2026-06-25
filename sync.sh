#!/bin/bash
# 从 3 个独立仓重建 skills/(独立仓是唯一源头,改完跑这个再 push 全家桶)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
for s in key-message-review activity-design-review business-analysis-review; do
  rm -rf "$HERE/skills/$s"
  git clone -q --depth 1 "https://github.com/MKTerXiaoV/$s" "$HERE/skills/$s"
  rm -rf "$HERE/skills/$s/.git"
  echo "✓ synced $s"
done
echo "—— 同步完成。git add -A && git commit && git push 即可更新全家桶。"
