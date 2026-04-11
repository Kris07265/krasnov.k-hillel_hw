import {Container, Button, Card} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/users";
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
    const handleLogin = () => {
        localStorage.setItem("token", "token");
        setIsAuth(true);
        navigate(from, { replace: true });
        window.location.reload();
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/users");
        window.location.reload();
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card className="px-5 py-2">
                <Card.Body className="text-center">
                    <h3 className="mb-4">Login Page</h3>

                    <div>
                        {!isAuth ? (
                            <Button variant="primary" size="lg" onClick={handleLogin}>
                                Login
                            </Button>
                        ) : (
                            <Button variant="danger" size="lg" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;