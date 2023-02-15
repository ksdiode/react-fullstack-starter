require('dotenv').config();
const fs = require('fs');
const express = require('express');
const setMiddleware = require('./middleware');

// 서버 설정
var app = express();
setMiddleware(app);
app.use('/api', require('./api'));

//DB 서버 연결
require('./database');

// 웹서버 기동
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  if (!fs.existsSync(process.env.UPLOAD_DIR)) {
    fs.mkdirSync(process.env.UPLOAD_DIR);
  }

  console.log(`서비 기동 http://127.0.0.1:${PORT}/`);
});
