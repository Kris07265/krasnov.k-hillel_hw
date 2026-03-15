import {Container} from "react-bootstrap";
import {useState} from "react";

function Component() {
    const [log, setLog] = useState([]);
    const lastEl = log[0] ? log[0] : 0;
    const addElHandler = (num) => {
        const newEl = lastEl + num;
        setLog(log => [newEl, ...log]);
    }
    const removeElHandler = (index) => {
        const newLog = log.filter((el, i) => i !== index);
        setLog(newLog);
    }

    return (
        <Container className="mt-5 text-center">
            <div>
                <div className="btn-group font-monospace" role="group">
                    <button type="button" className="btn btn-outline-success" onClick={() => addElHandler(1)}>+</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => addElHandler(-1)}>-</button>
                </div>

                <div className="list-group mt-3">
                    {log.map((item, index) => (
                        <button key={index} type="button" className="list-group-item list-group-item-action" onClick={() => removeElHandler(index)}>{item}</button>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Component;