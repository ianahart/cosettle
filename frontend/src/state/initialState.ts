import { nanoid } from 'nanoid';
export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const loginFormState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
};

export const tokenState = {
  refreshToken: '',
  token: '',
};

export const userState = {
  abbreviation: '',
  email: '',
  id: 0,
  lastName: '',
  firstName: '',
  loggedIn: false,
  role: '',
  profileId: 0,
  avatarUrl: '',
  theme: '',
  themeId: 0,
};

export const createSpaceState = {
  selectedIndex: 0,
  steps: {
    description: {
      size: { name: 'size', value: '', error: '', type: 'text' },
      capacity: { name: 'capacity', value: '', error: '', type: 'text' },
      location: { name: 'location', value: '', error: '', type: 'text' },
      description: { name: 'description', value: '', error: '', type: 'text' },
      flooring: { name: 'flooring', value: '', error: '', type: 'text' },
      wifi: { name: 'wifi', value: '', error: '', type: 'text' },
    },
    availability: {
      price: { name: 'price', value: '', error: '', type: 'text' },
      days: { name: 'days', value: [], error: '', type: 'text' },
      openTime: { name: 'openTime', value: '9:00', error: '', type: 'text' },
      closeTime: { name: 'closeTime', value: '17:00', error: '', type: 'text' },
    },
    amenities: {
      bathrooms: { name: 'bathroom', value: false, error: '', type: 'checkbox' },
      utilities: { name: 'utilities', value: false, error: '', type: 'checkbox' },
      food: { name: 'food', value: false, error: '', type: 'checkbox' },
    },

    contact: {
      firstName: { name: 'firstName', value: '', error: '', type: 'text' },
      lastName: { name: 'lastName', value: '', error: '', type: 'text' },
      email: { name: 'email', value: '', error: '', type: 'email' },
      phoneNumber: { name: 'phoneNumber', value: '', error: '', type: 'tel' },
    },
  },
};

export const daysState = [
  { id: nanoid(), name: 'Sunday' },
  { id: nanoid(), name: 'Monday' },
  { id: nanoid(), name: 'Tuesday' },
  { id: nanoid(), name: 'Wednesday' },
  { id: nanoid(), name: 'Thursday' },
  { id: nanoid(), name: 'Friday' },
  { id: nanoid(), name: 'Saturday' },
];
