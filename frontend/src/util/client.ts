import axios from 'axios';
import { IRegisterForm } from '../interfaces';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {
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
