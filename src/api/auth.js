import axios from 'axios';

const ins = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// 회원가입 메일 요청
function signupMail(email) {
  return ins.get(`users/join/${email}`);
}

export { signupMail };
