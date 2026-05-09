import Header from "../Header/Header.jsx";
import {Outlet} from "react-router";
import {Container} from "@mui/material";
import Footer from "../Footer/Footer.jsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;