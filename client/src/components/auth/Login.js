import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated, user } = authContext;
  const { setAlert } = alertContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/beds');
      }
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, user]);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || password === '') {
      setAlert('아이디와 비밀번호를 모두 입력해주세요', 'danger');
    } else {
      login({
        username,
        password
      });
    }
  };

  return (
    <div className='login-container'>
      <h1 className='text-primary'>
        <i className='fas fa-sign-in-alt'></i> 로그인
      </h1>
      <p className='lead'>병상 관리 시스템에 로그인하세요</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>아이디</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='로그인'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login; 