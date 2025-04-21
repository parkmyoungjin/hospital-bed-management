import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BedContext from '../../context/bed/bedContext';
import AlertContext from '../../context/alert/alertContext';

const AddBedForm = () => {
  const bedContext = useContext(BedContext);
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const { addBed, error } = bedContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
    }
    // eslint-disable-next-line
  }, [error]);

  const [bed, setBed] = useState({
    department: '',
    wardName: '',
    roomNumber: '',
    bedCount: '',
    bedType: '',
    approvalDate: '',
    notes: ''
  });

  const { department, wardName, roomNumber, bedCount, bedType, approvalDate, notes } = bed;

  const onChange = e => setBed({ ...bed, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (department === '' || wardName === '' || roomNumber === '' || bedCount === '' || bedType === '') {
      setAlert('필수 항목을 모두 입력해주세요', 'danger');
    } else {
      addBed({
        department,
        wardName,
        roomNumber,
        bedCount: parseInt(bedCount),
        bedType,
        approvalDate: approvalDate || Date.now(),
        notes
      });
      
      setAlert('병상 정보가 추가되었습니다', 'success');
      
      // 폼 초기화
      setBed({
        department: '',
        wardName: '',
        roomNumber: '',
        bedCount: '',
        bedType: '',
        approvalDate: '',
        notes: ''
      });

      // 관리자 대시보드로 리다이렉트
      navigate('/admin');
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fas fa-plus"></i> 새 병상 추가
      </h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="department">진료과 *</label>
          <input
            type="text"
            name="department"
            value={department}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="wardName">병동 *</label>
          <input
            type="text"
            name="wardName"
            value={wardName}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomNumber">병실 *</label>
          <input
            type="text"
            name="roomNumber"
            value={roomNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bedCount">병상 수 *</label>
          <input
            type="number"
            name="bedCount"
            value={bedCount}
            onChange={onChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bedType">병상 유형 *</label>
          <select name="bedType" value={bedType} onChange={onChange} required>
            <option value="" disabled>
              선택하세요
            </option>
            <option value="일반병상">일반병상</option>
            <option value="중환자병상">중환자병상</option>
            <option value="격리병상">격리병상</option>
            <option value="분만병상">분만병상</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="approvalDate">허가일</label>
          <input
            type="date"
            name="approvalDate"
            value={approvalDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">비고</label>
          <textarea
            name="notes"
            value={notes}
            onChange={onChange}
            placeholder="추가 정보 입력"
          />
        </div>
        <input
          type="submit"
          value="병상 추가"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default AddBedForm; 