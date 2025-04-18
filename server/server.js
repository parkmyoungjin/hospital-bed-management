const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 앱 초기화
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결 (추후 실제 연결 주소로 변경필요)
// 현재는 로컬 개발용으로 설정
mongoose.connect('mongodb://localhost:27017/hospital-bed-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB 연결 성공');
}).catch(err => {
  console.error('MongoDB 연결 실패:', err);
});

// 라우트 정의
app.use('/api/beds', require('./routes/beds'));
app.use('/api/auth', require('./routes/auth'));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('병상 관리 시스템 API가 실행 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 