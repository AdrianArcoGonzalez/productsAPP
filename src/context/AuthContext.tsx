import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useReducer, useEffect} from 'react';
import {
    LoginData,
    LoginResponse,
    RegisterData,
    Usuario,
} from '../interfaces/interfaces';
import authReducer, {AuthState} from './authReducer';
import {environmentsUser} from '../utils/environments';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'athenticated' | 'not-authenticated';
    signIn: (loginData: LoginData) => void;
    signUp: (registerData: RegisterData) => void;
    logout: () => void;
    removeError: () => void;
};

const authInitialState: AuthState = {
    status: 'checking',
    errorMessage: '',
    user: null,
    token: null,
};

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProvider {
    children: JSX.Element | JSX.Element[];
}

const AuthContextProvider = ({children}: AuthContextProvider) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return dispatch({type: 'notAuthenticated'});
        }

        try {
            const response = await cafeApi.get(environmentsUser.token);

            if (response.status !== 200) {
                dispatch({type: 'notAuthenticated'});
                return;
            }

            dispatch({
                type: 'signIn',
                payload: {
                    token: response.data.token,
                    user: response.data.usuario,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const signIn = async ({correo, password}: LoginData) => {
        try {
            const {data} = await cafeApi.post<LoginResponse>(
                environmentsUser.login,
                {
                    correo,
                    password,
                },
            );
            dispatch({
                type: 'signIn',
                payload: {token: data.token, user: data.usuario},
            });
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            dispatch({
                type: 'addError',
                payload:
                    (error as any).response.data.msg ||
                    'Información incorrecta',
            });
        }
    };

    const signUp = async ({nombre, correo, password}: RegisterData) => {
        try {
            const {data} = await cafeApi.post<LoginResponse>(
                environmentsUser.register,
                {
                    nombre,
                    correo,
                    password,
                },
            );
            dispatch({
                type: 'signIn',
                payload: {token: data.token, user: data.usuario},
            });
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'addError',
                payload:
                    (error as any).response.data.msg ||
                    'Información incorrecta',
            });
        }
    };
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'});
    };

    const removeError = () => {
        dispatch({type: 'removeError'});
    };

    return (
        <AuthContext.Provider
            value={{...state, signUp, signIn, logout, removeError}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
