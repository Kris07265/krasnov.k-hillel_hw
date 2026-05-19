import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Menu, Box, Typography, Skeleton } from '@mui/material';

import { useLoginMutation, useGetMeQuery } from '../../store/api/authApi.js';
import { setCredentials, logout } from '../../store/slices/authSlice.js';
import './AuthMenu.scss';

const AuthMenu = ({ anchorEl, handleClose }) => {
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const { data: currentUser, isLoading: isLoadingMe } = useGetMeQuery(undefined, { skip: !token });
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

    const dynamicSchema = yup.object().shape({
        ...(isRegister && {
            username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
        }),

        email: isRegister
            ? yup.string().required('Email is required').email('Invalid email format')
            : yup.string().required('Email or Username is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(dynamicSchema),
    });

    const open = Boolean(anchorEl);

    const switchTab = (toRegister) => {
        setIsRegister(toRegister);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            if (isRegister) {
                console.log('Registering user data:', data);
                setIsRegister(false);
                reset();
            } else {
                const result = await login({ username: data.email, password: data.password }).unwrap();
                dispatch(setCredentials({ user: result, token: result.token }));
                handleClose();
                reset();
            }
        } catch (error) {
            console.error('Auth error:', error);
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
                    <Box className="auth-menu__tabs">
                        <button
                            type="button"
                            className={`auth-menu__tab-btn ${!isRegister ? 'auth-menu__tab-btn--active' : ''}`}
                            onClick={() => switchTab(false)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`auth-menu__tab-btn ${isRegister ? 'auth-menu__tab-btn--active' : ''}`}
                            onClick={() => switchTab(true)}
                        >
                            Register
                        </button>
                    </Box>

                    <form className="auth-menu__form" onSubmit={handleSubmit(onSubmit)}>
                        {isRegister && (
                            <Box className="auth-menu__field-group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={`auth-menu__input ${errors.username ? 'auth-menu__input--error' : ''}`}
                                    {...register('username')}
                                />
                                {errors.username && <p className="auth-menu__error-text">{errors.username.message}</p>}
                            </Box>
                        )}

                        <Box className="auth-menu__field-group">
                            <input
                                type="text"
                                placeholder={isRegister ? "Email Address" : "Email or Username"}
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
                            ) : isRegister ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>
                </Box>
            )}
        </Menu>
    );
};

export default AuthMenu;