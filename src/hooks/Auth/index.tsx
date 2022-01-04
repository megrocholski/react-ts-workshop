import React, { createContext, useCallback, useContext, useState } from 'react';
import { User } from '../../@types/User';
import { Response } from '../../@types/Response';
import { api } from '../../services/api';

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<Response<User>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const [user, setUser] = useState<User>({} as User);

const signIn = useCallback(async () => {}, []);

const signUp = useCallback(async () => {}, []);

export const AuthProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={{ user, signIn, signUp }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Este hook deve ser utilizado dentro de seu provider');
  }
  return context;
};
