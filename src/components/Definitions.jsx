import React from "react";

function Definitions({data}){
    const items = data.map(item =>{
        return(
            <React.Fragment key={item.id}>
            <dt>{item.dt}</dt>
            <dd>{item.dd}</dd>
            </React.Fragment>
        )
    })
    return (
        <dl>
            {items}
        </dl>
    )
}

export default Definitions;