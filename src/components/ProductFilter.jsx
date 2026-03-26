import {Dropdown} from "react-bootstrap";

function ProductFilter({toggleSort, toggleFilter, sortType}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" align="end">
                Product Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => toggleFilter("all")}>
                    All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => toggleFilter("active")}>
                    Active
                </Dropdown.Item>
                <Dropdown.Item onClick={toggleSort}>
                    Name: {sortType === "asc" ? "Z → A" : "A → Z"}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProductFilter;