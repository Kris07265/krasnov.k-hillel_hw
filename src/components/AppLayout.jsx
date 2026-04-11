import AppNavbar from "./AppNavbar.jsx";
import {Container} from "react-bootstrap";

const AppLayout = ({children}) => {
    return (
        <>
        <AppNavbar/>
        <Container className="my-4">
            {children}
        </Container>
        </>
    )
}

export default AppLayout;