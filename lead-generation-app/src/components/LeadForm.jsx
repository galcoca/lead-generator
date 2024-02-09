import React from 'react';
import LeadFormFields from './LeadFormFields';
import Header from './Header';
import Footer from './Footer';

const LeadForm = ({ onSubmit }) => {
    const handleSubmit = async (formData, { setSubmitting, resetForm }) => {
        const values = JSON.stringify(formData);
        try {
            const url = "http://localhost:3001/submit"
            const options = {
                method: "POST",
                mode: 'cors',
                cache: 'default',
                headers: {
                    "Content-Type": "application/json"
                },
                body: values
            }
            const response = await fetch(url, options);

            console.log(response);

            if (!response.ok) {
              throw new Error('Failed to submit form');
            }
      
            console.log('Form submitted successfully');
            setSubmitting(false);
            resetForm();
        } catch (error) {
            console.error('Error submitting form: ', error);
            setSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <Header />
            <div className="leadForm">
                <h1>Lead Generation Form</h1>
                <LeadFormFields onSubmit={handleSubmit} />
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default LeadForm;
