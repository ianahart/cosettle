export interface IRegisterForm {
    firstName: {name: string; value: string; error: string; type: string};
    lastName: {name: string; value: string; error: string; type: string};
    email: {name: string; value: string; error: string; type: string};
    password: {name: string; value: string; error: string; type: string};
    confirmPassword: {name: string; value: string; error: string; type: string};
}

export interface ILoginForm {
    email: {name: string; value: string; error: string; type: string};
    password: {name: string; value: string; error: string; type: string};
}

export interface ITokens {
    refreshToken: string;
    token: string;
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


export interface ICreateSpaceForm {
    selectedIndex: number,
    steps: {
        description: {
            size: {name: string, value: string, error: string, type: string},
            capacity: {name: string, value: string, error: string, type: string},
            location: {name: string, value: string, error: string, type: string},
            description: {name: string, value: string, error: string, type: string},
            flooring: {name: string, value: string, error: string, type: string},
            wifi: {name: string, value: string, error: string, type: string}
        },
        availability: {
            price: {name: string, value: string, error: string, type: string},
            days: {name: string, value: string[], error: string, type: string}
        },
        amenities: {
            bathrooms: {name: string, value: string, error: string, type: string},
            utilities: {name: string, value: string, error: string, type: string},
        },

        contact: {
            firstName: {name: string, value: string, error: string, type: string},
            lastName: {name: string, value: string, error: string, type: string},
            email: {name: string, value: string, error: string, type: string},
            phoneNumber: {name: string, value: string, error: string, type: string},
        }
    }


}




