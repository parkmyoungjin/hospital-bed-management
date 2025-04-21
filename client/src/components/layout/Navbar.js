import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/beds">병상 현황</Link>
      </li>
      {isAuthenticated && user && user.role === 'admin' && (
        <li>
          <Link to="/admin">관리자 대시보드</Link>
        </li>
      )}
      <li>
        <span>안녕하세요, {user && user.name}님!</span>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">로그아웃</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/beds">병상 현황</Link>
      </li>
      <li>
        <Link to="/login">로그인</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className="fas fa-hospital"></i> 병상현황관리
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar; 