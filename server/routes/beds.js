const express = require('express');
const router = express.Router();
const Bed = require('../models/Bed');

// 인증 미들웨어 (나중에 구현)
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// 모든 병상 정보 가져오기
router.get('/', async (req, res) => {
  try {
    const beds = await Bed.find().sort({ department: 1, wardName: 1, roomNumber: 1 });
    res.json(beds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

// ID로 특정 병상 정보 가져오기
router.get('/:id', async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id);
    
    if (!bed) {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }
    
    res.json(bed);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }
    
    res.status(500).send('서버 오류');
  }
});

// 새로운 병상 정보 추가 (관리자 전용)
router.post('/', [auth, adminAuth], async (req, res) => {
  const { department, wardName, roomNumber, bedCount, bedType, approvalDate, notes } = req.body;

  try {
    const newBed = new Bed({
      department,
      wardName,
      roomNumber,
      bedCount,
      bedType,
      approvalDate: approvalDate || Date.now(),
      notes
    });

    const bed = await newBed.save();
    res.json(bed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

// 병상 정보 수정 (관리자 전용)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  const { department, wardName, roomNumber, bedCount, bedType, approvalDate, notes } = req.body;

  // 업데이트할 객체 생성
  const bedFields = {};
  if (department) bedFields.department = department;
  if (wardName) bedFields.wardName = wardName;
  if (roomNumber) bedFields.roomNumber = roomNumber;
  if (bedCount !== undefined) bedFields.bedCount = bedCount;
  if (bedType) bedFields.bedType = bedType;
  if (approvalDate) bedFields.approvalDate = approvalDate;
  if (notes) bedFields.notes = notes;
  bedFields.updatedAt = Date.now();

  try {
    let bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }

    // 병상 정보 업데이트
    bed = await Bed.findByIdAndUpdate(
      req.params.id,
      { $set: bedFields },
      { new: true }
    );

    res.json(bed);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }
    res.status(500).send('서버 오류');
  }
});

// 병상 정보 삭제 (관리자 전용)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }

    await bed.remove();
    res.json({ msg: '병상 정보가 삭제되었습니다.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '병상 정보를 찾을 수 없습니다.' });
    }
    res.status(500).send('서버 오류');
  }
});

module.exports = router; 