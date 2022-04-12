import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { getUserDoc } from "../firebase/documents";
import { AppUser } from "../models/User";
import { MessageContext } from "./MessageProvider";
// import { User } from "../models/User";

interface ContextProps {
    user: AppUser|null;
    updated: Boolean;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext=createContext<ContextProps|null>(null);

interface Props{
    children: React.ReactNode;
}

export default function UserProvider({children}:Props){
    const appMessageCtx=useContext(MessageContext);
    const [user, setUser] = useState<AppUser|null>(null);
    const [updated, setUpdated] = useState(false);

    useEffect(() =>{
       const unlisten = auth.onAuthStateChanged(
          authUser => {
            if (authUser) {
                getUserDoc(authUser.uid, appMessageCtx)
                .then(u => u ? setUser(u) : setUser(null))      
            } else {
                setUser(null);
            }
          },
       );
       return () => {
           unlisten();
       }
    }, [updated]);

    return (
        <UserContext.Provider value={{user, updated, setUpdated}}>
            {children}
        </UserContext.Provider>
    )
}