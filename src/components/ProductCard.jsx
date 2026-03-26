import {Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";
import '../scss/ProductCard.scss'

function ProductCard({product, onDelete, onToggle}) {
    return (
        <Card  className={`card ${product.active ? 'card--active' : 'card--inactive'}`}>
            {product.image && (
                <Card.Img className="card__img" variant="top" src={product.image} />
            )}
            <Card.Body className="card__body">
                <Card.Title className="card__title">{product.name}</Card.Title>
                <Card.Text className="card__text">Description: {product.description}</Card.Text>
                <Card.Text className="card__text">Price: {product.price}</Card.Text>
                <Card.Text className="card__text">Discount Price: {product.discountPrice}</Card.Text>
                <Card.Text className="card__text">Category: {product.category}</Card.Text>
                <Card.Text className="card__text">Brand: {product.brand}</Card.Text>
                <Card.Text className="card__text">SKU: {product.sku}</Card.Text>
                <Card.Text className="card__text">Stock Quantity: {product.stock}</Card.Text>
                <Card.Text className="card__text">In Stock: {product.inStock ? 'Yes' : 'No'}</Card.Text>
                <Card.Text className="card__text">Show on Home Page: {product.featured ? 'Yes' : 'No'}</Card.Text>
                <div className="card__btns">
                    <Button
                        className="card__btn-delete"
                        variant="danger"
                        onClick={() => onDelete(product.id)}>Delete
                    </Button>
                    <Button
                        className="card__btn-toggleActive"
                        variant={product.active ? 'warning' : 'success'}
                        onClick={() => onToggle(product.id)}
                    >
                        {product.active ? 'Deactivate' : 'Activate'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
};
export default ProductCard;