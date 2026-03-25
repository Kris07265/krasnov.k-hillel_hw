import {Col, Container, Row} from "react-bootstrap";
import ProductForm from "./components/ProductForm.jsx";
import {useState} from "react";
import ProductList from "./components/ProductList.jsx";


function App() {
    const [products, setProducts] = useState([]);

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
    return (
        <div className="container my-5">
            <Container>
                <Row>
                    <Col xs={4}>
                        <ProductForm onSubmit={addProduct} />
                    </Col>
                    <Col xs={8}>
                        <ProductList
                            products={products}
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
