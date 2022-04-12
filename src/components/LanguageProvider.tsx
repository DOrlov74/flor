import { createContext, useState } from "react";

interface ContextProps {
    language: boolean;
    setLanguage: React.Dispatch<React.SetStateAction<boolean>>| null;
};

const defaultContext = {
    language: true,
    setLanguage: null
};

export const LangContext=createContext<ContextProps>(defaultContext);

interface Props{
    children: React.ReactNode;
};

export default function LanguageProvider({children}:Props){
    const [language, setLanguage] = useState(true);

    return (
        <LangContext.Provider value={{language, setLanguage}}>
            {children}
        </LangContext.Provider>
    )
};