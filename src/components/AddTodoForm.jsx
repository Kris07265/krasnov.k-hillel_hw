import { useState } from 'react';
import { Container, Button, Form} from 'react-bootstrap';

function AddTodoForm(props) {
    const [text, setText] = useState('');
    const handleChange=(e) => setText(e.target.value);
    const handleSubmit=(e) => {
        e.preventDefault();
        props.addTodoHandler(text);
        setText('');
    };
    return (
        <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>New To Do</Form.Label>
                <Form.Control type="text" value={text} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Add To Do
            </Button>
        </Form>
        </Container>
    );
}

export default AddTodoForm;