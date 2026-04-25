import AppHeader from "./AppHeader/AppHeader.jsx";
import {Outlet} from "react-router";
import {Container} from "@mui/material";
import AppFooter from "./AppFooter/AppFooter.jsx";

const AppLayout = () => {
    return (
        <>
            <Container fixed>
                <AppHeader/>
                <Outlet/>
            </Container>
            <AppFooter/>
        </>
    )
}

export default AppLayout;