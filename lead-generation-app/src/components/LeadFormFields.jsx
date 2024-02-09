import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    firstname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
    lastname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Required'),
    message: Yup.string().max(500, 'Must be 500 characters or less')
});

const LeadFormFields = ({ onSubmit }) => {
    return (
        <Formik initialValues={{ firstname: '', lastname: '', email: '', phone: '', message: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <Field type="text" id="firstname" name="firstname" placeholder="First Name"/>
                        <ErrorMessage name="firstname" component="div" className="error-message" />
                    </div>

                    <div>
                        <Field type="text" id="lastname" name="lastname" placeholder="Last Name"/>
                        <ErrorMessage name="lastname" component="div" className="error-message" />
                    </div>

                    <div>
                        <Field type="email" id="email" name="email" placeholder="E-Mail"/>
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div>
                        <Field type="tel" id="phone" name="phone" placeholder="Phone"/>
                        <ErrorMessage name="phone" component="div" className="error-message" />
                    </div>

                    <div>
                        <Field as="textarea" id="message" name="message" placeholder="Message"/>
                        <ErrorMessage name="message" component="div" className="error-message" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LeadFormFields;