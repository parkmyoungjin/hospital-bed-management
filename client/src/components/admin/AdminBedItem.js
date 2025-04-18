import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedContext from '../../context/bed/bedContext';

const AdminBedItem = ({ bed }) => {
  const bedContext = useContext(BedContext);
  const { deleteBed, setCurrent, clearCurrent } = bedContext;

  const { _id, department, wardName, roomNumber, bedCount, bedType, approvalDate } = bed;

  const onDelete = () => {
    if(window.confirm('정말로 이 병상 정보를 삭제하시겠습니까?')) {
      deleteBed(_id);
      clearCurrent();
    }
  };

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
      <td>
        <Link to={`/admin/beds/edit/${_id}`} className="btn btn-dark btn-sm">
          <i className="fas fa-edit"></i>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

AdminBedItem.propTypes = {
  bed: PropTypes.object.isRequired
};

export default AdminBedItem; 