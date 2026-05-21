import { Dialog, DialogContent, Typography } from '@mui/material';
import {CheckCircleOutlined} from "@mui/icons-material";
import './OrderSuccessModal.scss';

const OrderSuccessModal = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="order-success-modal"
            disableScrollLock
        >
            <DialogContent className="order-success-modal__content">
                <CheckCircleOutlined className="order-success-modal__icon" />
                <Typography variant="h3" className="order-success-modal__title">
                    Thank You!
                </Typography>
                <Typography className="order-success-modal__message">
                    Your order has been successfully placed.
                </Typography>
                <Typography className="order-success-modal__redirect-text">
                    You will be redirected to the home page shortly...
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default OrderSuccessModal;