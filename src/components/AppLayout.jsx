import AppNavbar from "./AppNavbar.jsx";
import {Container} from "react-bootstrap";
import PropTypes from "prop-types";

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

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;