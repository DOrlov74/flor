import { createContext, useState } from "react";

interface ContextProps {
    page: string | boolean;
    setPage: React.Dispatch<React.SetStateAction<string | boolean>>| null;
};

const defaultContext = {
    page: '/',
    setPage: null
};

export const PageContext=createContext<ContextProps>(defaultContext);

interface Props{
    children: React.ReactNode;
};

export default function PageProvider({children}:Props){
    const [page, setPage] = useState<string | boolean>('/');

    return (
        <PageContext.Provider value={{page, setPage}}>
            {children}
        </PageContext.Provider>
    )
};