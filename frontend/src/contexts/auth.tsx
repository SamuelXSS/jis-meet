import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { Notification } from '../components/Notifications'

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

interface Register {
    name: string,
    username: string,
    pass: string,
}

interface AuthContextData {
    signed: boolean;
    user: User | null
    Login(user: string, pass: string): Promise<any>;
    Register(user:object): Promise<any>
    Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ open, setOpen ] = useState(true)

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
                Notification('error', err.response.data.error)
                console.log(err.response.data.error)
            }
        })
        return res
    }

    async function Register(user:Register) {
        await api.post('/user', {
            name: user.name,
            username: user.username,
            pass: user.pass,
            token: ''

        }).then(res => {
            Login(user.username, user.pass)
            setOpen(false)
        }).catch(err => {
            if (err.response) {
                Notification('error', err.response.data.error)
            }
        })
    }

    function Logout() {
        setUser(null);

        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
    }


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Register, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

