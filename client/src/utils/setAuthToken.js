import axios from 'axios';

// 토큰이 있으면 전역 헤더에 설정, 없으면 삭제
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken; 