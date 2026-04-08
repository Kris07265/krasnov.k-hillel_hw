import {useFormik} from "formik";
import {userSchema} from "../validation/userSchema.js";
import {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import FormField from "./FormField.jsx";

const UserForm = ({onSubmit, initialData = null}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            companyName: '',
            city: '',
            street: '',
        },

        validationSchema: userSchema,

        onSubmit,
    })

    useEffect(() => {
        if(!initialData) return
        formik.setValues({...initialData})
    }, [initialData]);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormField
                name="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                error={formik.errors.name}
            />

            <FormField
                name="username"
                label="Username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.username}
                error={formik.errors.username}
            />

            <FormField
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.email}
                error={formik.errors.email}
            />

            <FormField
                name="phone"
                label="Phone"
                type="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.phone}
                error={formik.errors.phone}
            />

            <FormField
                name="website"
                label="Website"
                type="text"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.website}
                error={formik.errors.website}
            />

            <FormField
                name="companyName"
                label="Company"
                type="text"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.companyName}
                error={formik.errors.companyName}
            />

            <FormField
                name="city"
                label="City"
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.city}
                error={formik.errors.city}
            />

            <FormField
                name="street"
                label="Street"
                type="text"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.street}
                error={formik.errors.street}
            />

            <Button type="submit" variant="success" className="mt-3">Confirm</Button>
        </Form>
    )
}

export default UserForm