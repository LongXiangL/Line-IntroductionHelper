
// 建立express伺服器
const express = require("express");
const app = express();

// 引用linebot SDK
let linebot = require("linebot");

// 用於辨識Line Channel的資訊
let bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken,
});

const linebotParser = bot.parser();
//當有人傳完訊息給bot時
bot.on("message", function (event) {
  // event.message.text是使用者傳給bot的訊息
  const introRegex = /你|誰|介紹|you|yourself|hello|你好|hi/gi;
  const resumeRegex = /resume|履歷|cv/gi;
  const blogRegex = /blog|部落格|文章/gi;
  const userText = event.message.text;
  if (introRegex.test(userText)) {
    event.reply(
      "你好！我是龍驤，從體育老師到創業咖啡廳，跨營運生鮮食品，因為疫情接觸網頁開發與銷售，目前往全端/後端網頁工程師的領域邁進。"
    );
  } else if (resumeRegex.test(userText)) {
    event.reply(
      "以下是我目前的最新履歷以及檔案，正在尋找後端工程師職位，歡迎隨時與我聯繫 \n\n履歷:https://www.cakeresume.com/bfh1104 \n\n作品集頁面: https://www.cakeresume.com/me/bfh1104/portfolios\n\ngithub頁面:https://github.com/LongXiangL "
    );
  } else if (blogRegex.test(userText)) {
    event.reply(
      "以下是我的部落格連結，主要發布一些、專案筆記以及求職紀錄\n\n部落格連結: https://medium.com/@bfh1104"
    );
  } else {
    event.reply(
      "不知道該問什麼嗎？ 歡迎透過以下的關鍵字與我互動！\n\n介紹/履歷/部落格"
    );
  }
});
//送出帶有line-bot需要資訊的POST請求

// 送出帶有line-bot需要資訊的POST請求
app.post("/", linebotParser);

// 啟動express server
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server start");
});