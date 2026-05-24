import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Menu, Box, Typography, Skeleton } from '@mui/material';

import { useLoginMutation, useGetMeQuery } from '../../store/api/authApi.js';
import { setCredentials, logout } from '../../store/slices/authSlice.js';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import './AuthMenu.scss';
import PropTypes from "prop-types";

const AuthMenu = ({ anchorEl, handleClose }) => {
    const dispatch = useDispatch();
    const [authError, setAuthError] = useState(null);

    const token = useSelector((state) => state.auth.token);
    const { data: currentUser, isLoading: isLoadingMe } = useGetMeQuery(undefined, { skip: !token });
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

    const schema = yup.object().shape({
        email: yup.string().required('Email or Username is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const open = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAuthError(null);
        handleClose();
    };

    const onSubmit = async (data) => {
        setAuthError(null);
        try {
            const result = await login({ username: data.email, password: data.password }).unwrap();
            dispatch(setCredentials({ user: result, token: result.token }));
            handleMenuClose();
            reset();
        } catch (error) {
            setAuthError(error?.data?.message || 'Invalid email or password');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="auth-menu"
            slotProps={{
                paper: { className: 'auth-menu__paper' }
            }}
        >
            {token ? (
                <Box className="auth-menu__user-box">
                    <Typography className="auth-menu__welcome">
                        {isLoadingMe ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                sx={{ width: '120px', height: '24px', display: 'inline-block' }}
                            />
                        ) : (
                            `Hi, ${currentUser?.firstName || currentUser?.username || 'User'}!`
                        )}
                    </Typography>
                    <button type="button" className="auth-menu__logout-btn" onClick={handleLogout}>
                        Log Out
                    </button>
                </Box>
            ) : (
                <Box>

                    <ErrorMessage error={authError} />

                    <h2 className="auth-menu__title">LOGIN</h2>

                    <form className="auth-menu__form" onSubmit={handleSubmit(onSubmit)}>
                        <Box className="auth-menu__field-group">
                            <input
                                type="text"
                                placeholder="Email or Username"
                                className={`auth-menu__input ${errors.email ? 'auth-menu__input--error' : ''}`}
                                {...register('email')}
                            />
                            {errors.email && <p className="auth-menu__error-text">{errors.email.message}</p>}
                        </Box>

                        <Box className="auth-menu__field-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className={`auth-menu__input ${errors.password ? 'auth-menu__input--error' : ''}`}
                                {...register('password')}
                            />
                            {errors.password && <p className="auth-menu__error-text">{errors.password.message}</p>}
                        </Box>

                        <button type="submit" className="auth-menu__submit-btn" disabled={isLoginLoading}>
                            {isLoginLoading ? (
                                <Skeleton
                                    variant="circular"
                                    animation="wave"
                                    sx={{
                                        width: '20px',
                                        height: '20px',
                                        margin: '0 auto',
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                    }}
                                />
                            ) : 'Sign In'}
                        </button>
                    </form>
                </Box>
            )}
        </Menu>
    );
};

AuthMenu.propTypes = {
    anchorEl: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    handleClose: PropTypes.func.isRequired
};

export default AuthMenu;