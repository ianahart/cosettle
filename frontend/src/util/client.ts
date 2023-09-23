import axios from 'axios';
import { IRegisterForm } from '../interfaces';

export const http = axios.create({
  baseURL: 'https://cosettle.netlify.app/api/v1',
});

export const Client = {
  getGroupMessages: (groupId: number) => {
    return http.get(`/group-messages?groupId=${groupId}`);
  },

  getReviews: (spaceId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/reviews?spaceId=${spaceId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  getReviewStats: (spaceId: number) => {
    return http.get(`/reviews/stats?spaceId=${spaceId}`);
  },

  createReview: (userId: number, spaceId: number, rating: number, review: string) => {
    return http.post('/reviews', { userId, spaceId, rating, review });
  },

  getFavorites: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/favorites?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  isFavorited: (userId: number, spaceId: number) => {
    return http.get(`/favorites/is-favorited?userId=${userId}&spaceId=${spaceId}`);
  },

  toggleFavorite: (userId: number, spaceId: number, action: string) => {
    return http.post('/favorites', { userId, spaceId, action });
  },

  fetchSpace: (id: string | undefined) => {
    return http.get(`/spaces/${id}`);
  },

  fetchSpaces: (
    country: string,
    spaceType: string,
    city: string,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/spaces?country=${country}&spaceType=${spaceType}&city=${city}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  sendGroupInvite: (userId: number, adminId: number, groupId: number) => {
    return http.post('/group-members/invites', { userId, adminId, groupId });
  },

  searchUsersByName: (
    name: string,
    page: number,
    pageSize: number,
    direction: string,
    groupId: number,
    adminId: number
  ) => {
    return http.get(
      `/users/search/name?name=${name}&page=${page}&pageSize=${pageSize}&direction=${direction}&groupId=${groupId}&adminId=${adminId}`
    );
  },
  searchGroups: (
    searchTerm: string,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/groups/search?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  getComments: (postId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/comments?postId=${postId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },
  createComment: (postId: number, userId: number, text: string) => {
    return http.post('/comments', { postId, userId, text });
  },

  deletePost: (postId: number) => {
    return http.delete(`/posts/${postId}`);
  },
  unlikePost: (postId: number, userId: number) => {
    return http.post(`/likes/unlike`, { postId, userId });
  },
  likePost: (postId: number, userId: number) => {
    return http.post('/likes', { postId, userId });
  },
  getPosts: (groupId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/posts?groupId=${groupId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },
  createPost: (groupId: number, userId: number, content: string, file: File | null) => {
    const formData = new FormData();
    formData.append('groupId', groupId.toString());
    formData.append('userId', userId.toString());
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }
    return http.post('/posts', formData);
  },

  getGroupMembers: (
    groupId: number,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/group-members?groupId=${groupId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  uploadGroupBackgroundImage: (groupId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return http.patch(`groups/${groupId}/upload`, formData);
  },

  updateGroupName: (groupId: number, name: string) => {
    return http.patch(`/groups/${groupId}`, { name });
  },
  getGroup: (groupId: number) => {
    return http.get(`/groups/${groupId}`);
  },

  acceptInvite: (id: number, accepted: boolean) => {
    return http.patch(`/group-members/${id}`, { accepted });
  },

  ignoreInvite: (id: number) => {
    return http.delete(`/group-members/${id}`);
  },

  getInvites: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/group-members/invites?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  getJoinedGroups: (
    userId: number,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/group-members/joined-groups?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  getAdminGroups: (
    adminId: number,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/groups/admin?adminId=${adminId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },
  createGroup: (
    adminId: number,
    groupName: string,
    privacy: string,
    userIds: number[]
  ) => {
    return http.post('/groups', { adminId, groupName, privacy, userIds });
  },

  getUsers: (page: number, pageSize: number, direction: string) => {
    return http.get(`/users?page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  searchFriend: (userId: number, searchTerm: string) => {
    return http.get(`/friends/search-friend?userId=${userId}&searchTerm=${searchTerm}`);
  },

  searchFriends: (
    userId: number,
    searchTerm: string,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/friends/search-friends?userId=${userId}&searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  getChatMessages: (userId: number, friendId: number) => {
    return http.get(`/private-messages?userId=${userId}&friendId=${friendId}`);
  },
  getUser: (userId: number) => {
    return http.get(`/users/${userId}`);
  },

  removeFriend: (userId: number, friendId: number) => {
    return http.post('/friends/remove-friend', { userId, friendId });
  },

  getFriends: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/friends?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },
  acceptFriendRequest: (id: number, userId: number, friendId: number) => {
    return http.post('/friends/requests', { id, userId, friendId });
  },
  removeFriendRequest: (id: number) => {
    return http.delete(`/friends/${id}`);
  },
  getFriendRequests: (
    userId: number,
    page: number,
    pageSize: number,
    direction: string
  ) => {
    return http.get(
      `/friends/requests?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },
  searchUsers: (
    userId: number,
    direction: string,
    page: number,
    pageSize: number,
    term: string
  ) => {
    return http.get(
      `/users/search?userId=${userId}&direction=${direction}&page=${page}&pageSize=${pageSize}&term=${term}`
    );
  },

  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: number
  ) => {
    return http.patch(`/users/${userId}/change-password`, {
      oldPassword,
      newPassword,
      confirmPassword,
      userId,
    });
  },

  resetPasswordFromEmail: (
    id: number,
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    return http.post('/auth/password-reset', { id, token, newPassword, confirmPassword });
  },
  sendForgotPasswordEmail: (email: string) => {
    return http.post('/auth/forgot-password', { email });
  },
  uploadProfilePhoto: (file: File | null, profileId: number, action: string) => {
    const formData = new FormData();
    formData.append('action', action);
    formData.append('file', file ?? '');
    return http.patch(`/profiles/${profileId}/upload`, formData);
  },
  updateProfile: (form: any, userId: number, profileId: number) => {
    return http.patch(`/profiles/${profileId}`, { ...form, userId });
  },
  getProfile: (profileId: number) => {
    return http.get(`/profiles/${profileId}`);
  },
  createPhoto: (spaceId: number, photos: File[]) => {
    const formData = new FormData();
    formData.append('spaceId', spaceId.toString());
    photos.forEach((photo) => formData.append('photos', photo));
    return http.post('/space-photos', formData);
  },
  createSpace: (formData: any) => {
    return http.post('/spaces', formData);
  },
  updateTheme: (theme: string, themeId: number) => {
    return http.patch(`/themes/${themeId}`, { theme });
  },
  login: (email: string, password: string) => {
    return http.post('/auth/login', { email, password });
  },
  register: (form: IRegisterForm, role: string) => {
    const data = {
      role,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };
    return http.post('/auth/register', data);
  },
  syncUser: (token: string) => {
    return http.get('/users/sync', {
      headers: { Authorization: 'Bearer ' + token },
    });
  },
  heartbeat: () => {
    return http.get('/heartbeat');
  },
  logout: (refreshToken: string) => {
    return http.post('/auth/logout', { refreshToken });
  },
};
