import { Container, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router';
import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <section className="not-found">
            <Container className="not-found__container">
                <Box className="not-found__content">
                    <Typography variant="h1" className="not-found__title">
                        404
                    </Typography>

                    <Typography className="not-found__subtitle">
                        Page Not Found
                    </Typography>

                    <Typography className="not-found__text">
                        The page you are looking for doesn't exist or has been moved.
                    </Typography>

                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        disableElevation
                        className="not-found__btn"
                    >
                        Go to Homepage
                    </Button>
                </Box>
            </Container>
        </section>
    );
};

export default NotFoundPage;