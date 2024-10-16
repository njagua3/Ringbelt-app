# Ringbelt-app

# RINGBELT REAL ESTATE AGENTS

Welcome to the **RINGBELT REAL ESTATE AGENTS** project! This is a full-stack application designed for managing real estate properties, tenants, and landlords. The application allows users to perform CRUD operations on tenants, landlords, and properties, making it easy to manage rental information.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)


## Features
- **User Management**: Add, view, edit, and delete tenants and landlords.
- **Property Management**: Manage properties associated with landlords and tenants.
- **Responsive Design**: User-friendly interface that works on various devices.
- **Dynamic Routing**: Navigate between different views for tenants, landlords, and properties.
- **Professional UI**: Clean and modern design for an enhanced user experience.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Flask
- **Database**: SQLite (or any other database of your choice)
- **Styling**: CSS (with a focus on responsive design)

## Installation

### Prerequisites
- Python 3.x
- Node.js (for React)
- Pipenv (for managing Python packages)

### Backend Setup
1. Clone the repository:

   git clone https://github.com/yourusername/ringbelt-real-estate.git
   cd ringbelt-real-estate/server

Install dependencies:


pipenv install
Set environment variables (you may need to adjust these according to your setup):


export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
Run the Flask server:


flask db upgrade  # To set up the database
python seed.py    # To populate the database with initial data
python app.py      # To start the Flask application
Frontend Setup
Navigate to the client directory:

cd client
Install frontend dependencies:


npm install
Run the React application:


npm start
Usage
Open your browser and navigate to http://localhost:3000 to access the frontend application.
Use the navbar to navigate between tenants, landlords, and properties.
API Endpoints
GET /tenants: Retrieve all tenants.

POST /tenants: Add a new tenant.

GET /tenants/<id>: Retrieve a specific tenant by ID.

PUT /tenants/<id>: Update a tenant's details.

DELETE /tenants/<id>: Delete a tenant.

GET /landlords: Retrieve all landlords.

POST /landlords: Add a new landlord.

GET /landlords/<id>: Retrieve a specific landlord by ID.

PUT /landlords/<id>: Update a landlord's details.

DELETE /landlords/<id>: Delete a landlord.

GET /properties: Retrieve all properties.

POST /properties: Add a new property.

GET /properties/<id>: Retrieve a specific property by ID.

PUT /properties/<id>: Update a property's details.

DELETE /properties/<id>: Delete a property.