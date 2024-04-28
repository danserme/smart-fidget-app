import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import readData from './utils/readData';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            if (location.pathname === "/myrecords") {
                const newData = await readData();
                setData(newData);
            }
        };
        fetchData();
    }, [location.pathname, data]);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};
