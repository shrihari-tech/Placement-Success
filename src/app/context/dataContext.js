"use client"

import { createContext, useContext } from "react";
import { useState } from "react";

const DataContext = createContext({});

// Create a custom hook to use the context
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

const DataProvider = ({ children }) => {
    const [batchingvalue, setBatchingValue] = useState('');
    const [loginUser , setLoginUser] = useState();
    const firstLetterUser = loginUser && loginUser.length > 0 ? loginUser.charAt(0).toUpperCase() : '';

    return (
        <DataContext.Provider value={{
            batchingvalue,setBatchingValue,setLoginUser,firstLetterUser
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
