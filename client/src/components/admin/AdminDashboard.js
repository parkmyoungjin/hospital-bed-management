import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BedContext from '../../context/bed/bedContext';
import AuthContext from '../../context/auth/authContext';
import BedItem from '../bed/BedItem';
import AdminBedItem from './AdminBedItem';
import Spinner from '../layout/Spinner';

const AdminDashboard = () => {
  const bedContext = useContext(BedContext);
  const authContext = useContext(AuthContext);

  const { beds, loading, getBeds } = bedContext;
  const { user } = authContext;

  useEffect(() => {
    getBeds();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="admin-dashboard">
      <h2>관리자 대시보드</h2>
      <p className="lead">안녕하세요, {user && user.name}님!</p>
      <p>병상 현황을 관리할 수 있습니다.</p>

      <div className="admin-actions">
        <Link to="/admin/beds/add" className="btn btn-primary">
          <i className="fas fa-plus"></i> 새 병상 추가
        </Link>
      </div>

      <div className="bed-stats">
        <div className="stat-card">
          <h3>총 병상 수</h3>
          <p className="stat-value">{beds.reduce((acc, bed) => acc + bed.bedCount, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>진료과 수</h3>
          <p className="stat-value">{new Set(beds.map(bed => bed.department)).size}</p>
        </div>
        <div className="stat-card">
          <h3>병동 수</h3>
          <p className="stat-value">{new Set(beds.map(bed => bed.wardName)).size}</p>
        </div>
      </div>

      <h3>병상 목록</h3>
      {beds.length === 0 ? (
        <p>등록된 병상이 없습니다.</p>
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
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {beds.map(bed => (
              <AdminBedItem key={bed._id} bed={bed} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard; 