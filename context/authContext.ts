import { createContext } from "react";


export const AuthContext = createContext<{ authStatus: boolean }>({
    authStatus: false
});


export const AuthProvider = AuthContext.Provider ;