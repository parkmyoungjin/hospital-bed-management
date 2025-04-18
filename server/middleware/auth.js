const jwt = require('jsonwebtoken');

// JWT 시크릿 키 (실제 프로젝트에서는 환경 변수로 설정해야 함)
const JWT_SECRET = 'hospital_bed_jwt_secret';

module.exports = function(req, res, next) {
  // 헤더에서 토큰 가져오기
  const token = req.header('x-auth-token');

  // 토큰이 없는 경우
  if (!token) {
    return res.status(401).json({ msg: '인증 토큰이 없습니다. 접근이 거부되었습니다.' });
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, JWT_SECRET);

    // 요청 객체에 사용자 정보 추가
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: '토큰이 유효하지 않습니다.' });
  }
}; 