import {Col, Container, Row} from "react-bootstrap";
import ProductForm from "../ProductForm/ProductForm.jsx";
import {useEffect, useState} from "react";
import ProductList from "../ProductList/ProductList.jsx";
import './app.scss';
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import ProductEditModal from "../ProductEditModal/ProductEditModal.jsx";


function App() {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const handleSaveProduct = (productData) => {
        if (editingProduct) {
            setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
            setEditingProduct(null);
        } else {
            setProducts(prev => [...prev, { ...productData, id: crypto.randomUUID() }]);
        }
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const toggleActive = (id) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === id ? { ...p, active: !p.active } : p
            )
        );
    };

    const [sortType, setSortType] = useState("asc");
    const [filterType, setFilterType] = useState("all");

    const toggleSort = () => {
        setSortType(prev => prev === "asc" ? "desc" : "asc");
    };
    const toggleFilter = (type) => {
        setFilterType(type);
    };

    const sortedAndFilteredProducts = [...products]
        .filter(p => filterType === "all" ? true : p.active)
        .sort((a, b) => {
            return sortType === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
    return (
        <div className="app__container">
            <Container>
                <Row>
                    <Col xs={4}>
                        <ProductForm onSubmit={handleSaveProduct} />
                    </Col>
                    <Col xs={8}>
                        <ProductFilter
                            sortType={sortType}
                            toggleSort={toggleSort}
                            toggleFilter={toggleFilter}
                        />
                        <ProductList
                            products={sortedAndFilteredProducts}
                            onDelete={deleteProduct}
                            onToggle={toggleActive}
                            onEdit={setEditingProduct}
                        />
                    </Col>
                </Row>
            </Container>

            {editingProduct && (
                <ProductEditModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    )
}

export default App
