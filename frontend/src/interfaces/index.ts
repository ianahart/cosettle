export interface IRegisterForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IChangePasswordForm {
  password: { name: string; value: string; error: string; type: string };
  newPassword: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IPrivateMessage {
  createdAt: Date;
  id: number;
  message: string;
  receiverAvatarUrl: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverUserId: number;
  senderAvatarUrl: string;
  senderUserId: number;
}

export interface IResetPasswordForm {
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IForgotPasswordForm {
  email: { name: string; value: string; error: string; type: string };
}

export interface IProfileForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  bio: { name: string; value: string; error: string; type: string };
}

export interface ILoginForm {
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
}

export interface ITokens {
  refreshToken: string;
  token: string;
}

export interface IDay {
  id: string;
  name: string;
}

export interface IUser {
  abbreviation: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  loggedIn: boolean;
  role: string;
  profileId: number;
  avatarUrl: string;
  theme: string;
  themeId: number;
}

export interface IUserContext {
  nonAuthTheme: string;
  setNonAuthTheme: (theme: string) => void;
  tokens: ITokens;
  user: IUser;
  stowTokens: (tokens: ITokens) => void;
  updateUser: (user: IUser) => void;
  logout: () => void;
}

export interface IDescriptionForm {
  size: { name: string; value: string; error: string; type: string; step: string };
  capacity: { name: string; value: string; error: string; type: string; step: string };
  location: { name: string; value: string; error: string; type: string; step: string };
  description: { name: string; value: string; error: string; type: string; step: string };
  flooring: { name: string; value: string; error: string; type: string; step: string };
  wifi: { name: string; value: string; error: string; type: string; step: string };
}

export interface IAvailabilityForm {
  price: { name: string; value: string; error: string; type: string; step: string };
  days: { name: string; value: IDay[]; error: string; type: string; step: string };
  openTime: { name: string; value: string; error: string; type: string; step: string };
  closeTime: { name: string; value: string; error: string; type: string; step: string };
}

export interface IAmenitiesForm {
  bathrooms: { name: string; value: boolean; error: string; type: string; step: string };
  utilities: { name: string; value: boolean; error: string; type: string; step: string };
  food: { name: string; value: boolean; error: string; type: string; step: string };
}

export interface IContactForm {
  firstName: { name: string; value: string; error: string; type: string; step: string };
  lastName: { name: string; value: string; error: string; type: string; step: string };
  email: { name: string; value: string; error: string; type: string; step: string };
  phoneNumber: { name: string; value: string; error: string; type: string; step: string };
}

export interface IProfile {
  avatarUrl: string;
  bio: string;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
  userId: number;
}

export interface ICreateSpaceForm {
  selectedIndex: number;
  steps: {
    readonly [index: string]: any;
    description: IDescriptionForm;
    availability: IAvailabilityForm;
    amenities: IAmenitiesForm;
    contact: IContactForm;
  };
}

export interface IPasswordStrengthMeter {
  name: string;
  id: string;
  marked: boolean;
  word: string;
}

export interface IPagination {
  pageSize: number;
  direction: string;
  page: number;
  totalPages: number;
}

export interface IFriendRequest {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  id: number;
  senderId: number;
}

export interface IFriend {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  profileId: number;
}

export interface ISearchUser {
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
  userId: number;
  status: string;
}

export interface IChatUser {
  avatarUrl: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}
