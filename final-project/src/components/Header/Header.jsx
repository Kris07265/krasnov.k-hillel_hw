import { useSelector } from 'react-redux';
import {useState} from "react";
import {AppBar, Toolbar, Box, Badge, IconButton, Drawer, List, ListItem, Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router';

import './Header.scss';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const toggleDrawer = (open) => () => {
        setMobileMenuOpen(open);
    };

    return (
        <AppBar position='static' color="transparent" elevation={0} className="header">
            <Container>
            <Toolbar disableGutters className="header__toolbar">
                <Box className="header__left-section">
                    <IconButton
                        edge="start"
                        className="header__menu-mobile-btn"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link to="/" className="header__logo">
                        SHOP.CO
                    </Link>
                </Box>

                <Box className="header__nav-desktop">
                    <Link to="/shop" className="header__nav-link header__nav-link--lg">
                        Shop <KeyboardArrowDownIcon fontSize="small" />
                    </Link>
                    <Link to="/on-sale" className="header__nav-link header__nav-link--lg">On Sale</Link>
                    <Link to="/new-arrivals" className="header__nav-link header__nav-link--lg">New Arrivals</Link>
                    <Link to="/brands" className="header__nav-link header__nav-link--lg">Brands</Link>
                </Box>

                <Box className="header__search-wrapper">
                    <SearchIcon className="header__search-icon-inside"/>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="header__search-input"
                    />
                </Box>

                <Box className="header__actions">
                    <IconButton className="header__search-mobile-btn">
                        <SearchIcon />
                    </IconButton>

                    <IconButton component={Link} to="/cart" className="header__action-btn">
                        <Badge badgeContent={totalQuantity} color="primary" className="header__cart-badge">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>

                    <IconButton component={Link} to="/profile" className="header__action-btn">
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleDrawer(false)}>
                <Box className="header__mobile-drawer" role="presentation" onClick={toggleDrawer(false)}>
                    <List className="header__mobile-list">
                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/shop" className="header__nav-link header__nav-link--md">
                                Shop <KeyboardArrowDownIcon />
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/on-sale" className="header__nav-link header__nav-link--md">
                                On Sale
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/new-arrivals" className="header__nav-link header__nav-link--md">
                                New Arrivals
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/brands" className="header__nav-link header__nav-link--md">
                                Brands
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Container>
        </AppBar>
    );
};

export default Header;