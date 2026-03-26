import {useFormik} from 'formik';
import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormField from '../FormField/FormField.jsx';
import './ProductForm.scss'
import {formFieldsConfig, initialValues, validationSchema} from "./formConfig.js";

function ProductForm({onSubmit, initialData}) {

    const formik = useFormik({
        initialValues: initialData|| initialValues,
        enableReinitialize: true,
        validationSchema,

        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        }
    })

    return (
        <div>
            <h3>
                {initialData ? null : "Create New Product"}
            </h3>
            <Form onSubmit={formik.handleSubmit}>
                {formFieldsConfig.map((field) => (
                    <div key={field.name}>
                    <FormField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched[field.name]}
                        error={formik.errors[field.name]}
                    />
                        {field.name === 'image' && formik.values.image && (
                            <div className="mb-3">
                                <img
                                    src={formik.values.image}
                                    alt="Product Preview"
                                    className="form__img-inline"
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className="d-flex justify-content-between">
                <Button type='submit' variant="success">
                    {initialData ? "Save Changes" : "Add Product"}
                </Button>
                    {!initialData && (
                        <Button
                            type="reset"
                            variant="secondary"
                            onClick={formik.resetForm}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
}

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

export default ProductForm;