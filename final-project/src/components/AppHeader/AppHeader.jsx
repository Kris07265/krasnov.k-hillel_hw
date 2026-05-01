import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Box, Badge, IconButton, Drawer, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router';

import './AppHeader.scss';

const AppHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const toggleDrawer = (open) => () => {
        setMobileMenuOpen(open);
    };

    return (
        <AppBar position='static' color="transparent" elevation={0} className="header-wrapper">
                <Toolbar disableGutters className="header-toolbar">
                    <Box className="header-left-section">
                        <IconButton
                            edge="start"
                            className="menu-mobile-btn"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Link to="/" className="header-logo">
                            SHOP.CO
                        </Link>
                    </Box>

                    <Box className="nav-desktop">
                        <Link to="/shop" className="nav-link-lg">
                            Shop <KeyboardArrowDownIcon fontSize="small" />
                        </Link>
                        <Link to="/on-sale" className="nav-link-lg">On Sale</Link>
                        <Link to="/new-arrivals" className="nav-link-lg">New Arrivals</Link>
                        <Link to="/brands" className="nav-link-lg">Brands</Link>
                    </Box>

                    <Box className="search-wrapper">
                        <SearchIcon className="search-icon-inside"/>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="search-input"
                        />
                    </Box>

                    <Box className="header-actions">
                        <IconButton className="search-mobile-btn">
                            <SearchIcon />
                        </IconButton>

                        <IconButton component={Link} to="/cart" className="action-btn">
                            <Badge badgeContent={totalQuantity} color="primary" className="cart-badge">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>

                        <IconButton component={Link} to="/profile" className="action-btn">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

            <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleDrawer(false)}>
                <Box className="mobile-drawer-content" role="presentation" onClick={toggleDrawer(false)}>
                    <List className="mobile-list">
                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/shop" className="nav-link-md">
                                Shop <KeyboardArrowDownIcon />
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/on-sale" className="nav-link-md">
                                On Sale
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/new-arrivals" className="nav-link-md">
                                New Arrivals
                            </Link>
                        </ListItem>

                        <ListItem disablePadding onClick={toggleDrawer(false)}>
                            <Link to="/brands" className="nav-link-md">
                                Brands
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default AppHeader;