export const registerFormState = {
    firstName: {name: 'firstName', value: '', error: '', type: 'text'},
    lastName: {name: 'lastName', value: '', error: '', type: 'text'},
    email: {name: 'email', value: '', error: '', type: 'email'},
    password: {name: 'password', value: '', error: '', type: 'password'},
    confirmPassword: {name: 'confirmPassword', value: '', error: '', type: 'password'},
};

export const loginFormState = {
    email: {name: 'email', value: '', error: '', type: 'email'},
    password: {name: 'password', value: '', error: '', type: 'password'},
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
            size: {name: 'size', value: '', error: '', type: 'text'},
            capacity: {name: 'capacity', value: '', error: '', type: 'text'},
            location: {name: 'location', value: '', error: '', type: 'text'},
            description: {name: 'description', value: '', error: '', type: 'text'},
            flooring: {name: 'flooring', value: '', error: '', type: 'text'},
            wifi: {name: 'wifi', value: '', error: '', type: 'text'}
        },
        availability: {
            price: {name: 'price', value: '', error: '', type: 'text'},
            days: {name: 'days', value: [], error: '', type: 'text'}
        },
        amenities: {
            bathrooms: {name: 'bathroom', value: '', error: '', type: "checkbox"},
            utilities: {name: 'utilities', value: '', error: '', type: "checkbox"},
        },

        contact: {
            firstName: {name: 'firstName', value: '', error: '', type: 'text'},
            lastName: {name: 'lastName', value: '', error: '', type: 'text'},
            email: {name: 'email', value: '', error: '', type: 'email'},
            phoneNumber: {name: 'phoneNumber', value: '', error: '', type: 'text'},
        }
    }
}









