import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './styles.css'; // Ensure your styles are imported
import Tenants from './components/Tenants';
import Landlords from './components/Landlords';
import Properties from './components/Properties';
import EditTenant from './components/EditTenant';

const App = () => {
    const [landlords, setLandlords] = useState([]);
    const [properties, setProperties] = useState([]);
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        fetchLandlords();
        fetchProperties();
        fetchTenants();
    }, []);

    const fetchLandlords = async () => {
        const response = await fetch('/landlords');
        const data = await response.json();
        setLandlords(data);
    };

    const fetchProperties = async () => {
        const response = await fetch('/properties');
        const data = await response.json();
        setProperties(data);
    };

    const fetchTenants = async () => {
        const response = await fetch('/tenants');
        const data = await response.json();
        setTenants(data);
    };

    // Use useNavigate inside Router
    const navigate = useNavigate();

    const handleEditTenant = (tenantId) => {
        navigate(`/edit-tenant/${tenantId}`);
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tenants">Tenants</Link></li>
                    <li><Link to="/landlords">Landlords</Link></li>
                    <li><Link to="/properties">Properties</Link></li>
                </ul>
            </nav>

            <div className="container">
                <h1>RINGBELT REAL ESTATE AGENTS</h1>
                <h2>Welcome to the Tenant Management System</h2>

                <div className="landlords-section">
                    <h3>Landlords and Their Properties</h3>
                    {landlords.length === 0 ? (
                        <p>No landlords found.</p>
                    ) : (
                        landlords.map((landlord) => (
                            <div key={landlord.id} className="landlord-card">
                                <h4>{landlord.name}</h4>
                                <p>Properties:</p>
                                <ul>
                                    {properties
                                        .filter(property => property.landlord_id === landlord.id)
                                        .map(property => (
                                            <li key={property.id}>
                                                <strong>{property.name}</strong>
                                                <p>Tenants:</p>
                                                <ul>
                                                    {tenants
                                                        .filter(tenant => tenant.property_id === property.id)
                                                        .map(tenant => (
                                                            <li key={tenant.id}>
                                                                {tenant.name} - Rent: {tenant.rent_amount} - Room: {tenant.room_number}
                                                                <button onClick={() => handleEditTenant(tenant.id)}>Edit</button>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </li>
                                        ))} 
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <footer>
                <p>&copy; 2024 RINGBELT REAL ESTATE AGENTS</p>
            </footer>
        </div>
    );
};

const MainApp = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/landlords" element={<Landlords />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/edit-tenant/:id" element={<EditTenant />} />
        </Routes>
    </Router>
);

export default MainApp;
