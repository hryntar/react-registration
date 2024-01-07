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
   persist: boolean;
   setPersist: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const authInitialState: AuthDataType = { user: "", pwd: "", roles: [], accessToken: "" };

const AuthContext = createContext<IAuthContext>({
   auth: authInitialState,
   setAuth: () => {},
   persist: false,
   setPersist: () => {},
});

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
   const [auth, setAuth] = useState<AuthDataType>(authInitialState);
   const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")!) || false);

   return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
