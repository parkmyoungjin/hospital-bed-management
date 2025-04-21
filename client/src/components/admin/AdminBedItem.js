import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BedContext from '../../context/bed/bedContext';

const AdminBedItem = ({ bed }) => {
  const bedContext = useContext(BedContext);
  const { deleteBed } = bedContext;

  const { _id, department, wardName, roomNumber, bedCount, bedType, approvalDate } = bed;

  const onDelete = () => {
    if (window.confirm('정말로 이 병상 정보를 삭제하시겠습니까?')) {
      deleteBed(_id);
    }
  };

  return (
    <tr>
      <td>{department}</td>
      <td>{wardName}</td>
      <td>{roomNumber}</td>
      <td>{bedCount}</td>
      <td>{bedType}</td>
      <td>{new Date(approvalDate).toLocaleDateString()}</td>
      <td>
        <Link to={`/admin/beds/edit/${_id}`} className="btn btn-dark btn-sm">
          수정
        </Link>
        <button onClick={onDelete} className="btn btn-danger btn-sm">
          삭제
        </button>
      </td>
    </tr>
  );
};

AdminBedItem.propTypes = {
  bed: PropTypes.object.isRequired
};

export default AdminBedItem; 