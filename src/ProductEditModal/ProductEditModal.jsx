import {Modal} from "react-bootstrap";
import ProductForm from "../ProductForm/ProductForm.jsx";
import PropTypes from "prop-types";

function ProductEditModal({ product, onClose, onSave }){
    return (
        <Modal show={true} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Editing: {product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductForm
                    onSubmit={onSave}
                    initialData={product}
                    title="Edit Details"
                />
            </Modal.Body>
        </Modal>
    );
}

ProductEditModal.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ProductEditModal;