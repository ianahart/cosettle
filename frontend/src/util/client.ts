import axios from 'axios';
import { IRegisterForm } from '../interfaces';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {
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
