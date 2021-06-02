import { getInstance } from '@/api/index';

const ins = getInstance();

/**
 * 회원 가입 메일을 요청합니다.
 * @constructor
 * @param {string} email - 메일을 보낼 사용자의 이메일 주소
 */
function signupMail(email) {
  return ins.get(`users/join/${email}`);
}

/**
 * 회원 가입 진행
 * @constructor
 * @param {json} formData - email, name, password 가 필요 합니다.
 * @param {string} joinToken - 회원 가입 메일을 통해 받은 토큰을 보냅니다.
 */
function join(formData, joinToken) {
  return ins.post('users', formData, {
    headers: {
      'X-AUTH-TOKEN': joinToken,
    },
  });
}

/**
 * 로그인 진행
 * @constructor
 * @param {json} formData - email, password 가 필요 합니다.
 */
function login(formData) {
  return ins.post('users/login', formData);
}

export { signupMail, join, login };
