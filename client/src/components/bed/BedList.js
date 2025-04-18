import React, { useContext, useEffect, useState } from 'react';
import BedContext from '../../context/bed/bedContext';
import BedItem from './BedItem';
import Spinner from '../layout/Spinner';

const BedList = () => {
  const bedContext = useContext(BedContext);
  const { beds, loading, getBeds } = bedContext;

  const [filterText, setFilterText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    getBeds();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  // 병상 데이터 필터링
  const filteredBeds = beds.filter(
    (bed) =>
      (bed.department.toLowerCase().includes(filterText.toLowerCase()) ||
        bed.wardName.toLowerCase().includes(filterText.toLowerCase()) ||
        bed.roomNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        bed.bedType.toLowerCase().includes(filterText.toLowerCase())) &&
      (departmentFilter === '' || bed.department === departmentFilter)
  );

  // 유니크한 진료과 목록 생성
  const departments = [...new Set(beds.map((bed) => bed.department))].sort();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bed-list">
      <h2>병상 현황</h2>
      <div className="filter-container">
        <div className="form-group">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <select value={departmentFilter} onChange={handleDepartmentChange}>
            <option value="">모든 진료과</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredBeds.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>진료과</th>
              <th>병동</th>
              <th>병실</th>
              <th>병상 수</th>
              <th>병상 유형</th>
              <th>허가일</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeds.map((bed) => (
              <BedItem key={bed._id} bed={bed} />
            ))}
          </tbody>
        </table>
      )}
      <div className="bed-summary">
        <p>
          총 병상 수: {filteredBeds.reduce((acc, bed) => acc + bed.bedCount, 0)}
        </p>
      </div>
    </div>
  );
};

export default BedList; 