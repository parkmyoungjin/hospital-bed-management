import React from 'react';
import PropTypes from 'prop-types';

const BedItem = ({ bed }) => {
  const { department, wardName, roomNumber, bedCount, bedType, approvalDate } = bed;

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return '날짜 정보 없음';
    }
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
  bed: PropTypes.shape({
    department: PropTypes.string.isRequired,
    wardName: PropTypes.string.isRequired,
    roomNumber: PropTypes.string.isRequired,
    bedCount: PropTypes.number.isRequired,
    bedType: PropTypes.string.isRequired,
    approvalDate: PropTypes.string.isRequired
  }).isRequired
};

export default BedItem; 