import axios from 'axios';

const ins = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// 회원가입 메일 요청
function signupMail(email) {
  return ins.get(`users/join/${email}`);
}

// 회원가입
function join(formData, joinToken) {
  return ins.post('users', formData, {
    headers: {
      'X-AUTH-TOKEN': joinToken,
    },
  });
}

// 로그인
function login(formData) {
  return ins.post('users/login', formData);
}

export { signupMail, join, login };
