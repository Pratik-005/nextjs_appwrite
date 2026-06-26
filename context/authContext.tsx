import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
    authStatus: false,
    setAuthStatus: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authStatus, setAuthStatus] = useState(false);

    return (<AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        {children}
    </AuthContext.Provider>
    );
};