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

export const profileState = {
  userId: 0,
  profileId: 0,
  avatarUrl: '',
  bio: '',
  email: '',
  firstName: '',
  lastName: '',
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
      size: { name: 'size', value: '', error: '', type: 'text', step: 'description' },
      capacity: {
        name: 'capacity',
        value: '',
        error: '',
        type: 'text',
        step: 'description',
      },
      location: {
        name: 'location',
        value: '',
        error: '',
        type: 'text',
        step: 'description',
      },
      description: {
        name: 'description',
        value: '',
        error: '',
        type: 'text',
        step: 'description',
      },
      flooring: {
        name: 'flooring',
        value: '',
        error: '',
        type: 'text',
        step: 'description',
      },
      wifi: { name: 'wifi', value: '', error: '', type: 'text', step: 'description' },
    },
    availability: {
      price: { name: 'price', value: '', error: '', type: 'text', step: 'availability' },
      days: { name: 'days', value: [], error: '', type: 'text', step: 'availability' },
      openTime: {
        name: 'openTime',
        value: '9:00',
        error: '',
        type: 'text',
        step: 'availability',
      },
      closeTime: {
        name: 'closeTime',
        value: '17:00',
        error: '',
        type: 'text',
        step: 'availability',
      },
    },
    amenities: {
      bathrooms: {
        name: 'bathroom',
        value: false,
        error: '',
        type: 'checkbox',
        step: 'amenities',
      },
      utilities: {
        name: 'utilities',
        value: false,
        error: '',
        type: 'checkbox',
        step: 'amenities',
      },
      food: {
        name: 'food',
        value: false,
        error: '',
        type: 'checkbox',
        step: 'amenities',
      },
    },

    contact: {
      firstName: {
        name: 'firstName',
        value: '',
        error: '',
        type: 'text',
        step: 'contact',
      },
      lastName: { name: 'lastName', value: '', error: '', type: 'text', step: 'contact' },
      email: { name: 'email', value: '', error: '', type: 'email', step: 'contact' },
      phoneNumber: {
        name: 'phoneNumber',
        value: '',
        error: '',
        type: 'tel',
        step: 'contact',
      },
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

export const forgotPasswordFormState = {
  email: { name: 'email', value: '', error: '', type: 'text' },
};

export const profileForm = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'text' },
  bio: { name: 'bio', value: '', error: '', type: 'text' },
};

export const resetPasswordFormState = {
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const changePasswordFormState = {
  password: { name: 'password', value: '', error: '', type: 'password' },
  newPassword: { name: 'newPassword', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const passwordMeterState = [
  { name: 'lowercase', id: nanoid(), marked: false, word: 'Poor' },
  { name: 'uppercase', id: nanoid(), marked: false, word: 'Ok' },
  { name: 'digit', id: nanoid(), marked: false, word: 'Good' },
  {
    name: 'specialChar',
    id: nanoid(),
    marked: false,
    word: 'Excellent',
  },
];

export const chatUserState = {
  avatarUrl: '',
  email: '',
  firstName: '',
  id: 0,
  lastName: '',
};
