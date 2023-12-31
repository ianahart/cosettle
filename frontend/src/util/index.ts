export const retreiveTokens = () => {
    const storage = localStorage.getItem('tokens');
    let tokens;
    if (storage) {
        tokens = JSON.parse(storage);
    }
    return tokens;
};

export const retreiveNonAuthTheme = () => {
    const themeExists = localStorage.getItem('theme');
    let theme;
    if (themeExists) {
        theme = themeExists;
    }
    return theme;
}



export const slugifyTitle = (title: string) => {
    return title
        .split(' ')
        .map((word, index) => {
            if (index > 0) {
                return '-' + word;
            } else {
                return word;
            }
        })
        .join('');
};

export const slugify = (firstName: string, lastName: string) => {
    return (firstName + lastName).toLowerCase();
};

export const abbreviate = (firstName: string, lastName: string) => {
    return firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase();
};

export const capitalize = (value: string) => {
    return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
};
