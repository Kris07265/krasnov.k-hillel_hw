import {useFormik} from "formik";
import {userSchema} from "../validation/userSchema.js";
import {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import FormField from "./FormField.jsx";
import PropTypes from "prop-types";

const UserForm = ({onSubmit, initialData = null}) => {
    const formFields = [
        { name: "name", label: "Name", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "text" }, // Обычно тип 'text' или 'tel' для телефона
        { name: "website", label: "Website", type: "text" },
        { name: "companyName", label: "Company", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "street", label: "Street", type: "text" },
    ];

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
            {formFields.map((field) => (
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
            ))}
            <Button type="submit" variant="success" className="mt-3">Confirm</Button>
        </Form>
    )
}

UserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        website: PropTypes.string,
        companyName: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
    }),
};

export default UserForm