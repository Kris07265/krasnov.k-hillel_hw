import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name is too short (minimum 2 characters)')
        .required('Name is required'),

    username: Yup.string()
        .required('Username is required'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    phone: Yup.string()
        .required('Phone number is required'),

    website: Yup.string()
        .url('Enter a valid URL (e.g., https://google.com)')
        .required('Website is required'),

    city: Yup.string()
        .required('City is required'),

    street: Yup.string()
        .required('Street is required'),

    companyName: Yup.string()
        .required('Company name is required'),
})