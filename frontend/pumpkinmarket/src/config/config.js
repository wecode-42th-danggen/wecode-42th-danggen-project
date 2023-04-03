// const BASE_URl = 'http://52.79.164.28:3000';
const BASE_URl = 'http://192.168.0.194:4000';

export const API = {
  LOGIN: `${BASE_URl}/users/signin`,
  SIGNUP: `${BASE_URl}/users/signup`,
  USERPROFILEIMG: `${BASE_URl}/users/image`,
  SEARCH: `${BASE_URl}/posts?keyword=`,
  POSTS: `${BASE_URl}/posts`,
  COMMUNITY: `${BASE_URl}/communityposts`,
  CATEGORY: `${BASE_URl}/communityposts?categoryId=`,
  ADMIN: `${BASE_URl}/admin`,
  CHATS: `${BASE_URl}/chats`,
  MYPAGE: `${BASE_URl}/mypage`,
  COMMENTS: `${BASE_URl}/comments`,
  POSTSID: `${BASE_URl}/posts?postId=`,
  USERS: `${BASE_URl}/users`,
};

export default API;
