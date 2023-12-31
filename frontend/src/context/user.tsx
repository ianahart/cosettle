import {IUserContext, ITokens, IUser} from '../interfaces';
import {createContext, useState} from 'react';
import {userState, tokenState} from '../state/initialState';

interface IChildren {
    children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserContextProvider = ({children}: IChildren) => {
    const [user, setUser] = useState<IUser>(userState);
    const [tokens, setTokens] = useState<ITokens>(tokenState);
    const [nonAuthTheme, setNonAuthTheme] = useState(localStorage.getItem('theme') ?? '');

    const logout = () => {
        localStorage.clear();
        setUser(userState);
        setTokens(tokenState);
    };

    const stowTokens = (tokens: ITokens) => {
        localStorage.setItem('tokens', JSON.stringify(tokens));
        setTokens((prevState) => ({
            ...prevState,
            ...tokens,
        }));
    };

    const updateUser = (user: IUser) => {
        setUser((prevState) => ({
            ...prevState,
            ...user,
        }));
    };

    return (
        <UserContext.Provider
            value={{
                nonAuthTheme,
                setNonAuthTheme,
                tokens,
                user,
                stowTokens,
                updateUser,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
