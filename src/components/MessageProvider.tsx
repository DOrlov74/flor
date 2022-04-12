import { createContext, useState } from "react";
import { AppMessage, AppMessageContext } from "../models/AppMessage";

export const MessageContext=createContext<AppMessageContext|null>(null);

interface Props{
    children: React.ReactNode;
}

export default function MessageProvider({children}:Props){
    const [appMessage, setMessage] = useState<AppMessage|null>(null);

    return (
        <MessageContext.Provider value={{appMessage, setMessage}}>
            {children}
        </MessageContext.Provider>
    )
}