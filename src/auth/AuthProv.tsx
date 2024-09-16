import { createContext, useContext, useState } from "react";
import { AuthProvProps } from "../components/BODY/Interfaces";
const AuthContext = createContext({
    isAuthenticated: false,
});
export function AuthProv({ children }: AuthProvProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);