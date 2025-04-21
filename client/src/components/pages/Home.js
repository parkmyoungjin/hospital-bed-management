import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner">
        <h1>병원 병상 현황 관리 시스템</h1>
        <p className="lead">
          병원의 허가 병상 현황을 효율적으로 관리하고 조회할 수 있는 시스템입니다.
        </p>
        <div className="home-buttons">
          <Link to="/beds" className="btn btn-primary">
            병상 현황 보기
          </Link>
          <Link to="/login" className="btn btn-dark">
            관리자 로그인
          </Link>
        </div>
      </div>
      <div className="home-features">
        <div className="feature">
          <i className="fas fa-chart-bar fa-3x"></i>
          <h3>실시간 병상 현황</h3>
          <p>병상 현황을 실시간으로 확인할 수 있습니다.</p>
        </div>
        <div className="feature">
          <i className="fas fa-user-shield fa-3x"></i>
          <h3>관리자 권한 관리</h3>
          <p>승인된 관리자만 병상 정보를 수정할 수 있습니다.</p>
        </div>
        <div className="feature">
          <i className="fas fa-mobile-alt fa-3x"></i>
          <h3>모바일 대응</h3>
          <p>모바일 기기에서도 편리하게 사용할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 