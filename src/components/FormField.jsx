import {Form} from 'react-bootstrap';
import PropTypes from "prop-types";

function FormField({name, label, type="text", value, onChange, onBlur, error, touched}) {

    return (
        <Form.Group className="mb-3" key={name}>
            <Form.Label htmlFor={name} column="sm">{label}</Form.Label>
            <Form.Control
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={touched && !!error}
            />
            { touched && error ? (
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            ) : null
            }
        </Form.Group>
    )
}

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string,
    touched: PropTypes.bool,
};

export default FormField;