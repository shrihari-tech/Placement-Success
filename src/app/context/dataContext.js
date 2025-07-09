"use client"

import { createContext, useContext, useState, useEffect } from "react";

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
    const [loginUser, setLoginUser] = useState();
    const [batchHead, setBatchHead] = useState('');
    const firstLetterUser = loginUser && loginUser.length > 0 ? loginUser.charAt(0).toUpperCase() : '';

    // Use useEffect to update batchHead based on loginUser
    useEffect(() => {
        if (batchingvalue === 'fullstack') {
            setBatchHead('Full Stack Development');
        } else if (batchingvalue === 'dataanalytics') {
            setBatchHead('Data Analytics & Science');
        } else if (batchingvalue === 'banking') {
            setBatchHead('Banking & Financial Services');
        } else if (batchingvalue === 'marketing') {
            setBatchHead('Digital Marketing');
        } else if (batchingvalue === 'sap') {
            setBatchHead('SAP');
        } else if (batchingvalue === 'devops') {
            setBatchHead('DevOps');
        } else {
            setBatchHead('');
        }
    }, [batchingvalue]); // Dependency array to run effect when loginUser changes

    return (
        <DataContext.Provider value={{ 
            batchingvalue, setBatchingValue, setLoginUser, firstLetterUser, batchHead
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
