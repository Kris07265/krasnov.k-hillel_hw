import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to={`/login`} replace state={{from: location.pathname}}/>;
    }

    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute