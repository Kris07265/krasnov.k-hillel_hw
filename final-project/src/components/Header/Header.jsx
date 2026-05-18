import { useSelector } from 'react-redux';
import { useState } from "react";
import {
    AppBar, Toolbar, Box, Badge, IconButton, Drawer,
    List, ListItem, Container, Menu, MenuItem,
    Accordion, AccordionSummary, AccordionDetails, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from "../../store/api/productsApi.js";
import AuthMenu from "../AuthMenu/AuthMenu.jsx";
import './Header.scss';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [authAnchorEl, setAuthAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const { data: categories } = useGetCategoriesQuery();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenAuthMenu = (event) => {
        setAuthAnchorEl(event.currentTarget);
    };

    const handleCloseAuthMenu = () => {
        setAuthAnchorEl(null);
    };

    const handleCategoryClick = (categoryName) => {
        if (categoryName === 'all') {
            navigate('/all-products');
        } else {
            navigate(`/category/${categoryName}`);
        }
        handleCloseMenu();
        setMobileMenuOpen(false);
    };

    const handleNewArrivalsClick = (e) => {
        e.preventDefault();
        navigate('/all-products', { state: { sort: 'new-arrivals' } });
        setMobileMenuOpen(false);
    };

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

                        <Link to="/" className="header__logo">SHOP.CO</Link>

                        <nav className="header__nav-desktop">
                            <Box
                                className="header__nav-link header__nav-shop"
                                onClick={handleOpenMenu}
                            >
                                Shop <KeyboardArrowDownIcon fontSize="small" />
                            </Box>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseMenu}
                                className="header__dropdown-menu"
                                slotProps={{
                                    paper: { className: 'header__dropdown-paper' }
                                }}
                            >
                                <MenuItem
                                    onClick={() => handleCategoryClick('all')}
                                    className="header__dropdown-item header__dropdown-item--bold"
                                >
                                    All Products
                                </MenuItem>

                                {categories?.map((category) => (
                                    <MenuItem
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className="header__dropdown-item"
                                    >
                                        {category.replace('-', ' ')}
                                    </MenuItem>
                                ))}
                            </Menu>

                            <Link to="/on-sale" className="header__nav-link">On Sale</Link>
                            <Link
                                to="/all-products"
                                className="header__nav-link"
                                onClick={handleNewArrivalsClick}
                            >
                                New Arrivals
                            </Link>
                            <Link to="/brands" className="header__nav-link">Brands</Link>
                        </nav>
                    </Box>

                    <Box className="header__search-wrapper">
                        <SearchIcon className="header__search-icon" />
                        <input type="text" placeholder="Search for products..." className="header__search-input" />
                    </Box>

                    <Box className="header__icons">
                        <IconButton className="header__icon-btn header__icon-btn--mobile-search">
                            <SearchIcon />
                        </IconButton>
                        <IconButton component={Link} to="/cart" className="header__icon-btn">
                            <Badge badgeContent={totalQuantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>

                        <IconButton className="header__icon-btn" onClick={handleOpenAuthMenu}>
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleDrawer(false)}>
                <Box className="header__mobile-drawer" role="presentation">
                    <List className="header__mobile-list">
                        <ListItem disablePadding className="header__mobile-item">
                            <Accordion className="header__mobile-accordion" elevation={0}>
                                <AccordionSummary
                                    expandIcon={<KeyboardArrowDownIcon />}
                                    className="header__mobile-accordion-summary"
                                >
                                    <Typography className="header__nav-link">Shop</Typography>
                                </AccordionSummary>
                                <AccordionDetails className="header__mobile-accordion-details">
                                    <Box
                                        className="header__mobile-sublink header__mobile-sublink--bold"
                                        onClick={() => handleCategoryClick('all')}
                                    >
                                        All Products
                                    </Box>

                                    {categories?.map((category) => (
                                        <Box
                                            key={category}
                                            className="header__mobile-sublink"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category.replace('-', ' ')}
                                        </Box>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>

                        <ListItem disablePadding className="header__mobile-item">
                            <Link to="/on-sale" className="header__nav-link" onClick={toggleDrawer(false)}>On Sale</Link>
                        </ListItem>
                        <ListItem disablePadding className="header__mobile-item">
                            <Link
                                to="/all-products"
                                className="header__nav-link"
                                onClick={handleNewArrivalsClick}
                            >
                                New Arrivals
                            </Link>
                        </ListItem>
                        <ListItem disablePadding className="header__mobile-item">
                            <Link to="/brands" className="header__nav-link" onClick={toggleDrawer(false)}>Brands</Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <AuthMenu anchorEl={authAnchorEl} handleClose={handleCloseAuthMenu} />
        </AppBar>
    );
};

export default Header;