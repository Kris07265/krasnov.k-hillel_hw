import {Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";

function ProductCard({product, onDelete, onToggle}) {
    return (
        <Card  className={product.active ? 'border-success' : 'border-warning'}>
            {product.image && (
                <Card.Img variant="top" src={product.image} />
            )}
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
                    <Button
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