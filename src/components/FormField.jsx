import {Form} from 'react-bootstrap';

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

export default FormField;