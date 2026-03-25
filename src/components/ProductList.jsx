import ProductCard from "./ProductCard.jsx";
import PropTypes from "prop-types";

function ProductList({products, onDelete, onToggle}) {
    return (
        <div>
            {products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
                onDelete={onDelete}
                onToggle={onToggle}
            />
        ))}
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default ProductList;