import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // 사용자 로드
  const loadUser = async () => {
    // 로컬 스토리지에 토큰이 있으면 헤더에 설정
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.error('사용자 정보 로드 실패:', err);
      dispatch({ 
        type: AUTH_ERROR,
        payload: '사용자 정보를 불러올 수 없습니다.'
      });
    }
  };

  // 로그인
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      // 로그인 성공 후 사용자 정보 로드
      loadUser();
    } catch (err) {
      const errorMessage = err.response && err.response.data ? err.response.data.msg : '서버 연결에 실패했습니다.';
      console.error('로그인 실패:', err);
      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage
      });
    }
  };

  // 로그아웃
  const logout = () => dispatch({ type: LOGOUT });

  // 에러 초기화
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState; 