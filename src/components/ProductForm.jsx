import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Form, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormField from './FormField.jsx';
import '../scss/ProductForm.scss'

function ProductForm({onSubmit}) {

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            discountPrice: '',
            category: '',
            brand: '',
            sku: '',
            stock: 0,
            image: '',
            images: '',
            active: true,
            inStock: true,
            showOnMain: false,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Minimum 3 characters')
                .required('Product name is required'),

            description: Yup.string()
                .min(10, 'Minimum 10 characters')
                .required('Description is required'),

            price: Yup.number()
                .typeError('Price must be a number')
                .positive('Price must be greater than 0')
                .required('Price is required'),

            discountPrice: Yup.number()
                .typeError('Discount price must be a number')
                .max(Yup.ref('price'), 'Discount price cannot be greater than price'),

            category: Yup.string()
                .required('Category is required'),

            brand: Yup.string()
                .required('Brand is required'),

            sku: Yup.string()
                .required('SKU is required'),

            stock: Yup.number()
                .typeError('Stock must be a number')
                .min(0, 'Stock cannot be negative'),

            image: Yup.string()
                .url('Invalid URL format')
                .required('Image URL is required'),
        }),

        onSubmit: (values, { resetForm }) => {
            onSubmit({
                ...values,
                id: Date.now()
            });

            resetForm();
        }
    })

    return (
        <div>
            <h3>Product Form</h3>
            <Form onSubmit={formik.handleSubmit}>
                <FormField
                    name="name"
                    label="Product Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.name}
                    error={formik.errors.name}
                />

                <FormField
                    name="description"
                    label="Description"
                    type="textarea"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.description}
                    error={formik.errors.description}
                />

                <FormField
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.price}
                    error={formik.errors.price}
                />

                <FormField
                    name="discountPrice"
                    label="Discount Price"
                    type="number"
                    value={formik.values.discountPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.discountPrice}
                    error={formik.errors.discountPrice}
                />

                <FormField
                    name="category"
                    label="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.category}
                    error={formik.errors.category}
                />

                <FormField
                    name="brand"
                    label="Brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.brand}
                    error={formik.errors.brand}
                />

                <FormField
                    name="sku"
                    label="SKU"
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.sku}
                    error={formik.errors.sku}
                />

                <FormField
                    name="stock"
                    label="Stock Quantity"
                    type="number"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.stock}
                    error={formik.errors.stock}
                />

                <FormField
                    name="image"
                    label="Image URL"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.image}
                    error={formik.errors.image}
                />
                {formik.values.image && (
                    <img
                        className="form__img"
                        src={formik.values.image}
                        alt="preview"
                    />
                )}

                <FormField
                    name="images"
                    label="Additional Images"
                    value={formik.values.images}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.images}
                    error={formik.errors.images}
                />

                <FormField
                    name="active"
                    label="Active"
                    type="checkbox"
                    value={formik.values.active}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.active}
                    error={formik.errors.active}
                />

                <FormField
                    name="inStock"
                    label="In Stock"
                    type="checkbox"
                    value={formik.values.inStock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.inStock}
                    error={formik.errors.inStock}
                />

                <FormField
                    name="featured"
                    label="Show on Homepage"
                    type="checkbox"
                    value={formik.values.showOnMain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.showOnMain}
                    error={formik.errors.showOnMain}
                />
                <div className="d-flex justify-content-between">
                <Button type='submit'>Add Product</Button>
                <Button type="reset" variant="secondary" onClick={formik.resetForm}>Clear</Button>
                </div>
            </Form>
        </div>
    );
}

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;