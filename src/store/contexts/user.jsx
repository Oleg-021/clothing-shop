import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../../utils/firebase/firebase";

const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user)
                createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export {
    UserContext,
    UserProvider
}


