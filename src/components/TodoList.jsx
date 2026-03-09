import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from "react-bootstrap";

function TodoList() {
    const [todos, setTodos] = useState([
        { text: "Buy bread", done: false, id: 1},
        { text: "Wash the car", done: true, id: 2 },
    ]);

    const doneHandler = (id) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        setTodos(newTodos);
    };
    return (
        <Container className="mt-5">
        <ListGroup>
            {todos.map((todo) => {
                return <ListGroupItem
                    key={todo.id}
                    onClick={() => doneHandler(todo.id)}
                    className={todo.done ? "bg-success text-white" : ""}
                >{todo.text}</ListGroupItem>
            })}
        </ListGroup>
        </Container>
    );
}

export default TodoList;