const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 인증 미들웨어 (나중에 구현)
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// JWT 시크릿 키 (실제 프로젝트에서는 환경 변수로 설정해야 함)
const JWT_SECRET = 'hospital_bed_jwt_secret';

// 현재 로그인한 사용자 정보 가져오기
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

// 사용자 로그인
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 확인
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: '잘못된 사용자 정보입니다.' });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: '잘못된 사용자 정보입니다.' });
    }

    // JWT 토큰 발급
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

// 새 사용자 등록 (관리자 전용)
router.post('/register', [auth, adminAuth], async (req, res) => {
  const { username, password, name, role, department } = req.body;

  try {
    // 사용자 중복 확인
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: '이미 등록된 사용자입니다.' });
    }

    // 새 사용자 생성
    user = new User({
      username,
      password,
      name,
      role: role || 'user',
      department
    });

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // JWT 토큰 발급
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

module.exports = router; 