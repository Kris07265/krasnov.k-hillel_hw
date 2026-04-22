import AppHeader from "./AppHeader.jsx";
import {Outlet} from "react-router";

const AppLayout = () => {
    return (
        <>
            <AppHeader/>
            <div className="container">
                <Outlet/>
            </div>
        </>
    )
}

export default AppLayout;