import React from 'react';

function Card(props) {
    return (<div className="card">
            <div className="card-body">
            {props.title && <h4 className="card-title">hi, {props.title}</h4>}
            {props.text && <p className="card-text">how are you, {props.text}?</p>}
            </div>
            <hr/>
           </div>)
}

export default Card;