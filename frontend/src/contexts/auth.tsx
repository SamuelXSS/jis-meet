import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt from 'jwt-decode';
import api from '../services/api';
import * as auth from '../services/auth'

interface User {
    id: number;
    username: string;
    name: string;
    token: string;
  }

interface AuthContextData {
    signed: boolean;
    user: User | null;
    Login(user: string, pass: string): Promise<void>;
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
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@App:user');
            const storagedToken = localStorage.getItem('@App:token');

            if (storagedToken && storagedUser) {
                setUser(JSON.parse(storagedUser));
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
            }
        }
        loadStorageData();
    });

    async function Login(user: string, pass: string) {
        const res = await auth.signIn('samuelxses','S@muel1234')
            console.log(res)
            setUser(res.user);
            api.defaults.headers.Authorization = `Bearer ${res.user.token}`          
            localStorage.setItem('@App:user', JSON.stringify(res.user.username));
            localStorage.setItem('@App:token', res.user.token)
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

