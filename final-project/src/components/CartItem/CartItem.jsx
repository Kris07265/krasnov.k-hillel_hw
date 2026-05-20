import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { addItem, removeItem, deleteItem } from '../../store/slices/cartSlice.js';
import './CartItem.scss';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(addItem({
            id: item.id,
            price: item.price,
            title: item.title,
            thumbnail: item.thumbnail,
            stock: item.stock
        }));
    };

    const handleDecrease = () => {
        dispatch(removeItem(item.id));
    };

    const isMaxReached = item.stock !== undefined && item.quantity >= item.stock;

    return (
        <Box className="cart-item">
            <Box className="cart-item__image-container">
                <img src={item.thumbnail} alt={item.title} className="cart-item__image" />
            </Box>

            <Box className="cart-item__content">
                <Box className="cart-item__header">
                    <Typography className="cart-item__title">{item.title}</Typography>
                    <IconButton
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="cart-item__delete-btn"
                        disableRipple
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>

                <Box className="cart-item__footer">
                    <Typography className="cart-item__price">${item.price}</Typography>

                    <Box className="cart-item__counter" sx={{ position: 'relative' }}>
                        <IconButton onClick={handleDecrease} className="cart-item__counter-btn" disableRipple>
                            <RemoveIcon />
                        </IconButton>
                        <Typography className="cart-item__counter-value">{item.quantity}</Typography>
                        <IconButton
                            onClick={handleIncrease}
                            className="cart-item__counter-btn"
                            disabled={isMaxReached}
                            disableRipple
                        >
                            <AddIcon />
                        </IconButton>
                        {isMaxReached && (
                            <Typography sx={{ fontSize: '9px', color: 'red', position: 'absolute', bottom: '-12px', width: '100%', textAlign: 'center' }}>
                                Out of stock
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;