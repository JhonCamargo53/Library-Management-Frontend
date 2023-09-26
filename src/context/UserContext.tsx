import React, { useEffect, createContext, useState, useContext } from 'react';
import { IUser } from '../interface';
import { getCookieValueService } from '../service/CookieService';
import { COOKIE_NAME } from '../Contants';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: any
}

interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe ser utilizado dentro de un UserContextProvider');
    }
    return context;
};

// Proveedor del contexto del usuario
const UserContextProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        validateAuth();
    }, []);

    const logout = () => {

        setUser(null);
        setToken(null);
        document.cookie = `${COOKIE_NAME}=; max-age=0`;
        navigate('home');
    }

    const validateAuth = () => {

        try {

            const cookie = getCookieValueService(COOKIE_NAME);

            if (cookie) {
                setUser(cookie.user);
                setToken(cookie.token)
            } else {
                setUser(null);
                setToken(null)
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
