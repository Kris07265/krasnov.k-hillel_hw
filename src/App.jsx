import {Col, Container, Row} from "react-bootstrap";
import ProductForm from "./components/ProductForm.jsx";
import {useState} from "react";


function App() {
    const [products, setProducts] = useState([]);

    const addProduct = (product) => {
        setProducts(prev => [...prev, product]);
    };
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={4}>
                        <ProductForm onSubmit={addProduct} />
                    </Col>
                    <Col xs={8}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
