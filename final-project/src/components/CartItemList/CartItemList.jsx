import { Box } from '@mui/material';
import CartItem from '../CartItem/CartItem';
import './CartItemList.scss';
import PropTypes from "prop-types";

const CartItemList = ({ items }) => {
    return (
        <Box className="cart-items-section">
            <Box className="cart-items-section__block">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

CartItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            thumbnail: PropTypes.string,
            quantity: PropTypes.number.isRequired,
            stock: PropTypes.number
        })
    ).isRequired
};

export default CartItemList;