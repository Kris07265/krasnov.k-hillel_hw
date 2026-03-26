import ProductCard from "../ProductCard/ProductCard.jsx";
import PropTypes from "prop-types";
import './ProductList.scss'

function ProductList({products, onDelete, onToggle, onEdit}) {
    return (
        <div className="cards__container">
            {products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
            />
        ))}
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ProductList;