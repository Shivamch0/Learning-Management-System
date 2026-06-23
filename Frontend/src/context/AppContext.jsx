import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({childern}) => {
    const value = {}

    return <AppContext.Provider value={value}>{childern}</AppContext.Provider>
}