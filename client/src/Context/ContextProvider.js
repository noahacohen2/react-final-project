import AppContext from "./Context";
import { useState } from "react";


function ConetxtProvider({ children }) {
    const [userID, setUserID] = useState(undefined)

    const contextData = {
        'userID': [userID, setUserID],
    };

    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    );
}

export default ConetxtProvider;