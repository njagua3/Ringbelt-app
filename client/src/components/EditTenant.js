import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTenant = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const [tenant, setTenant] = useState({ name: '', rent_amount: '', room_number: '', property_id: '' });

    useEffect(() => {
        const fetchTenant = async () => {
            const response = await fetch(`/tenants/${id}`);
            const data = await response.json();
            setTenant(data);
        };

        fetchTenant();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTenant({ ...tenant, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/tenants/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tenant),
        });
        navigate('/tenants'); // Redirect after editing
    };

    return (
        <div className="container">
            <h2>Edit Tenant</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={tenant.name} onChange={handleChange} placeholder="Tenant Name" required />
                <input type="number" name="rent_amount" value={tenant.rent_amount} onChange={handleChange} placeholder="Rent Amount" required />
                <input type="text" name="room_number" value={tenant.room_number} onChange={handleChange} placeholder="Room Number" required />
                <input type="number" name="property_id" value={tenant.property_id} onChange={handleChange} placeholder="Property ID" required />
                <button type="submit">Update Tenant</button>
            </form>
        </div>
    );
};

export default EditTenant;
