import { FC, createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthDataType {
   user: string;
   pwd: string;
   roles: number[];
   accessToken: string;
}

interface IAuthContext {
   auth: AuthDataType;
   setAuth: Dispatch<SetStateAction<AuthDataType>>; 
}

// eslint-disable-next-line react-refresh/only-export-components
export const authInitialState: AuthDataType = { user: "", pwd: "", roles: [], accessToken: "" };

const AuthContext = createContext<IAuthContext>({
   auth: authInitialState,
   setAuth: () => {}, 
});

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
   const [auth, setAuth] = useState<AuthDataType>(authInitialState); 

   return <AuthContext.Provider value={{ auth, setAuth}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
