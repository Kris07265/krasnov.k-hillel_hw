import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Container, Box, Badge, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router';

import './AppHeader.scss'// Импортируем уже SCSS файл

const AppHeader = () => {
    // Подключаемся к стору, который ты настроил в index.js
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <AppBar position="static" color="transparent" elevation={0} className="header-container">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className="header-logo">
                        SHOP.CO
                    </Link>

                    {/* Навигация */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                        <Link to="/shop" className="nav-link">
                            Shop <KeyboardArrowDownIcon fontSize="small" />
                        </Link>
                        <Link to="/on-sale" className="nav-link">On Sale</Link>
                        <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
                        <Link to="/brands" className="nav-link">Brands</Link>
                    </Box>

                    {/* Поиск */}
                    <Box className="search-wrapper" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <SearchIcon sx={{ color: 'rgba(0,0,0,0.4)' }} />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="search-input"
                        />
                    </Box>

                    {/* Иконки */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} className="icon-button">
                            <SearchIcon />
                        </IconButton>

                        <IconButton component={Link} to="/cart" className="icon-button">
                            {/* Badge использует данные из твоего cartSlice */}
                            <Badge badgeContent={totalQuantity} className="cart-badge">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>

                        <IconButton component={Link} to="/profile" className="icon-button">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppHeader;