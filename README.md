# 步入静默 / Walking into Silence

逆向成长主题的神学互动小说原型。当前仓库处于 legacy takeover 阶段，本次只补齐公开 Pages 入口和本地运行说明。

## Play Online

https://dengxiaocheng.github.io/TheologyGame-WalkingSilence/

## Run Locally

不需要构建步骤，直接用静态服务器打开仓库根目录：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

也可以直接在浏览器打开 `index.html`。

## Notes

- Pages 入口：`index.html`
- 浏览器脚本：`js/main.js`
- 完整玩法仍按 `plan/legacy-takeover/LEGACY_FIX_PLAN.md` 后续推进；本次未重写游戏方向。
