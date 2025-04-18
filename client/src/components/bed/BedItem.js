import React from 'react';
import PropTypes from 'prop-types';

const BedItem = ({ bed }) => {
  const { department, wardName, roomNumber, bedCount, bedType, approvalDate, notes } = bed;

  // 날짜 형식 변환
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <tr>
      <td>{department}</td>
      <td>{wardName}</td>
      <td>{roomNumber}</td>
      <td>{bedCount}</td>
      <td>{bedType}</td>
      <td>{formatDate(approvalDate)}</td>
    </tr>
  );
};

BedItem.propTypes = {
  bed: PropTypes.object.isRequired
};

export default BedItem;
