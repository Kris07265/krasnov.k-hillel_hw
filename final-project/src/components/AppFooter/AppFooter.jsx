import React from 'react';
import { Box, Container, Grid, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import './AppFooter.scss';

const AppFooter = () => {
    return (
        <Box component="footer" className="footer-wrapper">
            <Container maxWidth="xl" className="newsletter-container">
                <Box className="newsletter-box">
                    <Typography variant="h4" className="newsletter-text">
                        STAY UP TO DATE ABOUT OUR LATEST OFFERS
                    </Typography>
                    <Box className="newsletter-form">
                        <Box className="input-group">
                            <MailOutlineOutlinedIcon className="input-icon" />
                            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                        </Box>
                        <Button variant="contained" className="subscribe-btn">
                            Subscribe to Newsletter
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Box className="footer-main">
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid xs={12} md={3}>
                            <Typography variant="h4" className="footer-logo">SHOP.CO</Typography>
                            <Typography className="footer-description">
                                We have clothes that suits your style and which you’re proud to wear. From women to men.
                            </Typography>
                            <Box className="social-icons">
                                <IconButton className="social-btn"><TwitterIcon fontSize="small" /></IconButton>
                                <IconButton className="social-btn"><FacebookIcon fontSize="small" /></IconButton>
                                <IconButton className="social-btn"><InstagramIcon fontSize="small" /></IconButton>
                                <IconButton className="social-btn"><GitHubIcon fontSize="small" /></IconButton>
                            </Box>
                        </Grid>

                        {[
                            { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
                            { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
                            { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
                            { title: 'RESOURCES', links: ['Free eBook', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] }
                        ].map((col) => (
                            <Grid xs={6} md={2.25} key={col.title}>
                                <Typography className="footer-title">{col.title}</Typography>
                                <ul className="footer-links">
                                    {col.links.map(link => (
                                        <li key={link}>
                                            <Link to="/" className="footer-link-item">{link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>

                    <Box className="footer-bottom">
                        <Typography className="copyright">
                            Shop.co © 2000-2023, All Rights Reserved
                        </Typography>
                        <Box className="payment-icons">
                            <Box className="payment-placeholder">Visa</Box>
                            <Box className="payment-placeholder">Mastercard</Box>
                            <Box className="payment-placeholder">PayPal</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default AppFooter;