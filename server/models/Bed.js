const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true
  },
  wardName: {
    type: String,
    required: true,
    trim: true
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true
  },
  bedCount: {
    type: Number,
    required: true,
    min: 0
  },
  bedType: {
    type: String,
    required: true,
    enum: ['일반병상', '중환자병상', '격리병상', '분만병상', '기타']
  },
  approvalDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bed', BedSchema); 