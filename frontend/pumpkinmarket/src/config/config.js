const BASE_URl = 'http://192.168.0.194:4000';

export const API = {
  LOGIN: `${BASE_URl}/users/signin`,
  SIGNUP: `${BASE_URl}/users/signup`,
  USERPROFILEIMG: `${BASE_URl}/users/image`,
  SEARCH: `${BASE_URl}/posts?keyword=`,
  POSTS: `${BASE_URl}/posts`,
  COMMUNITY: `${BASE_URl}/communityposts`,
  ADMIN: `${BASE_URl}/admin`,
  CHATS: `${BASE_URl}/chats`,
  MYPAGE: `${BASE_URl}/mypage`,
};

export default API;
