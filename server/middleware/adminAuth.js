module.exports = function(req, res, next) {
  // 사용자 역할 확인
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: '관리자 권한이 필요합니다. 접근이 거부되었습니다.' });
  }
}; 