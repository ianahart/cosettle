export interface IRegisterForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
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
  size: { name: string; value: string; error: string; type: string };
  capacity: { name: string; value: string; error: string; type: string };
  location: { name: string; value: string; error: string; type: string };
  description: { name: string; value: string; error: string; type: string };
  flooring: { name: string; value: string; error: string; type: string };
  wifi: { name: string; value: string; error: string; type: string };
}

export interface IAvailabilityForm {
  price: { name: string; value: string; error: string; type: string };
  days: { name: string; value: IDay[]; error: string; type: string };
  openTime: { name: string; value: string; error: string; type: string };
  closeTime: { name: string; value: string; error: string; type: string };
}

export interface IAmenitiesForm {
  bathrooms: { name: string; value: boolean; error: string; type: string };
  utilities: { name: string; value: boolean; error: string; type: string };
  food: { name: string; value: boolean; error: string; type: string };
}

export interface IContactForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  phoneNumber: { name: string; value: string; error: string; type: string };
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
