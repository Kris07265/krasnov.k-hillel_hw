import AppNavbar from "../components/AppNavbar.jsx";
import {Container} from "react-bootstrap";

const MainLayout = ({children}) => {
    return (
        <>
        <AppNavbar/>
        <Container className="mt-4">
            {children}
        </Container>
        </>
    )
}

export default MainLayout;