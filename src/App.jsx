import {Col, Container, Row} from "react-bootstrap";
import ProductForm from "./components/ProductForm.jsx";
import {useEffect, useState} from "react";
import ProductList from "./components/ProductList.jsx";
import './scss/app.scss';
import ProductFilter from "./components/ProductFilter.jsx";


function App() {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        setProducts(prev => [...prev, product]);
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

    const processedProducts = [...products]
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
                        <ProductForm onSubmit={addProduct} />
                    </Col>
                    <Col xs={8}>
                        <ProductFilter
                            sortType={sortType}
                            toggleSort={toggleSort}
                            toggleFilter={toggleFilter}
                        />
                        <ProductList
                            products={processedProducts}
                            onDelete={deleteProduct}
                            onToggle={toggleActive}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
