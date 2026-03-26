import * as Yup from "yup";

export const formFieldsConfig = [
    { name: 'name', label: 'Product Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'discountPrice', label: 'Discount Price', type: 'number' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'brand', label: 'Brand', type: 'text' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'stock', label: 'Stock Quantity', type: 'number' },
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'images', label: 'Additional Images', type: 'text' },
    { name: 'active', label: 'Active', type: 'checkbox' },
    { name: 'inStock', label: 'In Stock', type: 'checkbox' },
    { name: 'showOnMain', label: 'Show on Homepage', type: 'checkbox' },
];

export const initialValues = {
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
};

export const validationSchema = Yup.object({
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
});