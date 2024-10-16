import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Tenants = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTenants = async () => {
        try {
            const response = await axios.get('http://localhost:5555/tenants');
            setTenants(response.data);
        } catch (error) {
            console.error('Error fetching tenants:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTenant = async (values) => {
        try {
            await axios.post('http://localhost:5555/tenants', values);
            fetchTenants();
        } catch (error) {
            console.error('Error adding tenant:', error);
        }
    };

    const deleteTenant = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/tenants/${id}`);
            fetchTenants();
        } catch (error) {
            console.error('Error deleting tenant:', error);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Tenants</h1>
            <Formik
                initialValues={{ name: '', rent_amount: '', room_number: '', property_id: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    rent_amount: Yup.number().required('Required').positive(),
                    room_number: Yup.string().required('Required'),
                    property_id: Yup.string().required('Required'),
                })}
                onSubmit={addTenant}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field name="name" placeholder="Tenant Name" />
                        <Field name="rent_amount" placeholder="Rent Amount" type="number" />
                        <Field name="room_number" placeholder="Room Number" />
                        <Field name="property_id" placeholder="Property ID" />
                        <button type="submit">Add Tenant</button>
                    </Form>
                )}
            </Formik>
            <ul>
                {tenants.map(tenant => (
                    <li key={tenant.id}>
                        {tenant.name} - Room {tenant.room_number} - Rent: {tenant.rent_amount} 
                        <button onClick={() => deleteTenant(tenant.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tenants;
