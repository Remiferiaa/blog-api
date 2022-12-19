import Base from "./Norm";
import { useContext } from "react";
import Protected from "./CMS";
import { AuthContext } from "../Context/authContext";


const AppRoute = () => {
    const {auth} = useContext(AuthContext)

    return (
        auth ? <Protected/> : <Base/>
    )
}

export default AppRoute