import TodoList from './components/TodoList.jsx';
import AddTodoForm from './components/AddTodoForm.jsx';
import {useState} from "react";

function App() {
    const [todos, setTodos] = useState([]);

    const doneHandler = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            })
        );
    };

    const addTodoHandler = (text) => {
        const newTodo = {
            text: text,
            done: false,
            id: !todos.length ? 1 : todos[todos.length - 1].id + 1
        }
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

  return (
    <>
        <TodoList doneHandler={doneHandler} todos={todos} />
        <AddTodoForm addTodoHandler={addTodoHandler} />
    </>
  )
}

export default App
