import { Container, ListGroup, ListGroupItem } from "react-bootstrap";

function TodoList(props) {
    return (
        <Container className="mt-5">
            <h1 className="mb-3 text-center">To Do List</h1>
        <ListGroup>
            {props.todos.map((todo) => {
                return <ListGroupItem
                    key={todo.id}
                    onClick={() => props.doneHandler(todo.id)}
                    action variant={todo.done ? "success" : "light"}
                >{todo.text}</ListGroupItem>
            })}
        </ListGroup>
        </Container>
    );
}

export default TodoList;