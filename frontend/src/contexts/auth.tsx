import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

interface User {
    id: number,
    name: string,
    username: string,
    secrets: {
        content: string,
        color: string,
        quantity: number
    }
}

interface AuthContextData {
    signed: boolean;
    user: User | null
    Login(user: string, pass: string): Promise<any>;
    Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    async function Login(user: string, pass: string) {
        const res = await api.post('/auth', {
            username: user,
            pass: pass,
        }).then((res) => {
            const { user } = res.data
            setUser(user);
            api.defaults.headers.Authorization = `Bearer ${res.data.token}`

            localStorage.setItem('@App:user', JSON.stringify(res.data.user));
            localStorage.setItem('@App:token', res.data.token)

            return true
        }).catch(err => {
            if (err.response) {
                return false
            }
        })
        return res
    }

    function Logout() {
        setUser(null);

        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
    }


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

