const GPM_ROOT = 'http://localhost:8080/api/';
const GPM_AUTH = 'auth/';
const GMP_LOGIN = 'login';
const GMP_SIGNUP = 'signup';
const GMP_AUTHUSER = 'user';
const GMP_LOGOUT = 'logout';
const GMP_LIKE = 'like';
const GMP_DISLIKE = 'dislike';

const GPM_USERS = 'users';
const GPM_POSTS = 'posts';
const GPM_COMMENTS = 'comments';

export const API_POSTS = GPM_ROOT + GPM_POSTS;
export const API_USERS = GPM_ROOT + GPM_USERS;
export const API_AUTH_LOGIN = GPM_ROOT + GPM_AUTH + GMP_LOGIN;
export const API_AUTH_SIGNUP = GPM_ROOT + GPM_AUTH + GMP_SIGNUP;
export const API_AUTH_AUTHUSER = GPM_ROOT + GPM_AUTH + GMP_AUTHUSER;
export const API_AUTH_LOGOUT = GPM_ROOT + GPM_AUTH + GMP_LOGOUT;
export const API_COMMENTS = GPM_ROOT + GPM_COMMENTS;
export const API_POSTLIKE = GPM_ROOT + GPM_POSTS +'/'+ GMP_LIKE;
export const API_POSTDISLIKE = GPM_ROOT + GPM_POSTS +'/'+ GMP_DISLIKE;
export const API_COMMENTLIKE = GPM_ROOT + GPM_COMMENTS + '/'+ GMP_LIKE;
export const API_COMMENTDISLIKE = GPM_ROOT + GPM_COMMENTS + '/'+ GMP_DISLIKE;



