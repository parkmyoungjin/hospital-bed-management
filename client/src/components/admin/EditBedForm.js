import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BedContext from '../../context/bed/bedContext';
import AlertContext from '../../context/alert/alertContext';

const EditBedForm = () => {
  const bedContext = useContext(BedContext);
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { beds, updateBed, error, getBeds } = bedContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    getBeds();
    // eslint-disable-next-line
  }, []);

  const [bed, setBed] = useState({
    department: '',
    wardName: '',
    roomNumber: '',
    bedCount: '',
    bedType: '',
    approvalDate: '',
    notes: ''
  });

  // 현재 편집 중인 병상 데이터 가져오기
  useEffect(() => {
    if (beds.length > 0) {
      const currentBed = beds.find(b => b._id === id);
      if (currentBed) {
        setBed({
          department: currentBed.department,
          wardName: currentBed.wardName,
          roomNumber: currentBed.roomNumber,
          bedCount: currentBed.bedCount,
          bedType: currentBed.bedType,
          approvalDate: currentBed.approvalDate ? new Date(currentBed.approvalDate).toISOString().substr(0, 10) : '',
          notes: currentBed.notes || ''
        });
      }
    }
  }, [beds, id]);

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
    }
    // eslint-disable-next-line
  }, [error]);

  const { department, wardName, roomNumber, bedCount, bedType, approvalDate, notes } = bed;

  const onChange = e => setBed({ ...bed, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (department === '' || wardName === '' || roomNumber === '' || bedCount === '' || bedType === '') {
      setAlert('필수 항목을 모두 입력해주세요', 'danger');
    } else {
      updateBed({
        _id: id,
        department,
        wardName,
        roomNumber,
        bedCount: parseInt(bedCount),
        bedType,
        approvalDate: approvalDate || Date.now(),
        notes
      });
      
      setAlert('병상 정보가 업데이트되었습니다', 'success');
      
      // 관리자 대시보드로 리다이렉트
      navigate('/admin');
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fas fa-edit"></i> 병상 정보 수정
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
          value="병상 정보 업데이트"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default EditBedForm;