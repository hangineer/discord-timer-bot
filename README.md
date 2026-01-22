# 🤖 Disscord Advanced Timer Bot

(WIP .......)

## 使用技術 
* Node.js
* discord.js (v14)

## 環境需求
* Node.js v16.9.0 以上


## 使用導覽

### 使用機器人


1. **邀請機器人到你的 Discord 伺服器**

    點選 🔗 機器人邀請連結
     https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=bot%20applications.commands
    (將 YOUR_CLIENT_ID 替換成自己的)
     
     **如何取得 CLIENT_ID（Application ID）？**
     - 前往 [Discord Developers Portal](https://discord.com/developers/applications)
     - 選擇你的應用程式
     - 在左側選單點選 "General Information"
     - 複製 Application ID（等同 CLIENT_ID）
     
     ![](https://i.meee.com.tw/UFo39oe.png)

2. **使用指令**
   - 在 Discord 伺服器中輸入 `/timer`
   - 輸入倒數的時間（分鐘，必填）
   - 填寫 timer 標題 (選填)
   - 機器人會顯示倒數時間，並在時間到時提醒你

---

### 運行機器人

如果你想自己運行這個機器人，需要進行以下設定：

1. **準備環境**
   - 安裝 Node.js v16.9.0 以上版本
   - 在 [Discord Developers Portal](https://discord.com/developers/applications) 建立一個應用程式
   - 取得 Bot Token：
     - 在左側選單點選 "Bot"
     - 點選 "Reset Token" 或 "Copy" 複製 Token
   - 取得 Application ID（也就是 CLIENT_ID）：
     - 在左側選單點選 "General Information"
     - 複製 "Application ID"
   - 確保 Bot 已開啟 `applications.commands` 和 `bot` 權限

2. **安裝 & 環境變數**
   ```bash
   pnpm install
   ```
   - 複製 `.env.example` 檔案並改為 `.env`
   - 在 `.env` 檔案中填入你的 `DISCORD_TOKEN` 和 `CLIENT_ID`：
     ```
     DISCORD_TOKEN=你的_Bot_Token
     CLIENT_ID=你的_Application_ID
     ```
     **注意**：CLIENT_ID 就是 Application ID，兩者是同一個東西

3. **啟動機器人**
   ```bash
   node index.js
   ```
   - 看到「指令刷新成功」和「已登入為 Timer Bot 🤖 ...」訊息就表示機器人已成功啟動
