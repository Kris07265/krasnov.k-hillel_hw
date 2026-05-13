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
import './Header.scss';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
        handleCloseMenu();
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
                                className="header__nav-link header__nav-link--lg header__nav-shop"
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

                            <Link to="/on-sale" className="header__nav-link header__nav-link--lg">On Sale</Link>
                            <Link to="/new-arrivals" className="header__nav-link header__nav-link--lg">New Arrivals</Link>
                            <Link to="/brands" className="header__nav-link header__nav-link--lg">Brands</Link>
                        </nav>
                    </Box>

                    <Box className="header__search-wrapper">
                        <SearchIcon className="header__search-icon-inside" />
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
                        <IconButton className="header__icon-btn">
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
                            <Link to="/new-arrivals" className="header__nav-link" onClick={toggleDrawer(false)}>New Arrivals</Link>
                        </ListItem>
                        <ListItem disablePadding className="header__mobile-item">
                            <Link to="/brands" className="header__nav-link" onClick={toggleDrawer(false)}>Brands</Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Header;