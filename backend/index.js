require('dotenv').config();
const express = require('express');
const setMiddleware = require('./middleware');

// 서버 설정
var app = express();
setMiddleware(app);
app.use('/api', require('./api'));

//DB 서버 연결
require('./database');

// 웹서버 기동
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on port http://127.0.0.1:${PORT}/`)
);
