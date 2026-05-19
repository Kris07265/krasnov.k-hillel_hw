import { Box, Container, Grid, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import logo from '../../assets/img/logo.png';
import footerApplePay from '../../assets/img/footerApplePay.png'
import footerGooglePay from '../../assets/img/footerGooglePay.png'
import footerMasterCard from '../../assets/img/footerMasterCard.png'
import footerPayPal from '../../assets/img/footerPayPal.png'
import footerVisa from '../../assets/img/footerVisa.png'

import './Footer.scss';

const Footer = () => {
    return (
        <Box component="footer" className="footer">
            <Container className="footer__newsletter-container">
                <Box className="footer__newsletter">
                    <Typography variant="h4" className="footer__newsletter-text">
                        STAY UP TO DATE ABOUT OUR LATEST OFFERS
                    </Typography>
                    <Box className="footer__newsletter-form">
                        <Box className="footer__input-group">
                            <MailOutlineOutlinedIcon className="footer__input-icon" />
                            <input type="email" placeholder="Enter your email address" className="footer__input" />
                        </Box>
                        <Button variant="contained" className="footer__subscribe-btn">
                            Subscribe to Newsletter
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Box className="footer__main">
                <Container>
                    <Grid container spacing={4}>
                        <Grid size={{xs:12, md: 3}}>
                            <Box className="footer__logo">
                            <img
                            src={logo}
                            alt="Logo"/>
                            </Box>
                            <Typography className="footer__description">
                                We have clothes that suits your style and which you’re proud to wear. From women to men.
                            </Typography>
                            <Box className="footer__socials">
                                <IconButton className="footer__social-btn"><TwitterIcon fontSize="small" /></IconButton>
                                <IconButton className="footer__social-btn"><FacebookIcon fontSize="small" /></IconButton>
                                <IconButton className="footer__social-btn"><InstagramIcon fontSize="small" /></IconButton>
                                <IconButton className="footer__social-btn"><GitHubIcon fontSize="small" /></IconButton>
                            </Box>
                        </Grid>

                        {[
                            { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
                            { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
                            { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
                            { title: 'RESOURCES', links: ['Free eBook', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] }
                        ].map((col) => (
                            <Grid size={{xs:6, md: 2.25}} key={col.title}>
                                <Typography className="footer__column-title">{col.title}</Typography>
                                <ul className="footer__links-list">
                                    {col.links.map(link => (
                                        <li key={link} className="footer__links-item">
                                            <Link to="/" className="footer__link">{link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>

                    <Box className="footer__bottom">
                        <Typography className="footer__copyright">
                            Shop.co © 2000-2023, All Rights Reserved
                        </Typography>
                        <Box className="footer__payments">
                            <Box className="footer__payment-img">
                                <img
                                src={footerVisa}
                                alt="Visa"/>
                            </Box>
                            <Box className="footer__payment-img">
                                <img
                                    src={footerMasterCard}
                                    alt="MasterCard"/>
                            </Box>
                            <Box className="footer__payment-img">
                                <img
                                    src={footerPayPal}
                                    alt="PayPal"/>
                            </Box>
                            <Box className="footer__payment-img">
                                <img
                                    src={footerApplePay}
                                    alt="ApplePay"/>
                            </Box>
                            <Box className="footer__payment-img">
                                <img
                                    src={footerGooglePay}
                                    alt="GooglePay"/>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;