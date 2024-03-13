# <div align="center">Frontend</div>

This is the frontend part of the application. It is built using React.js and Chakra UI.

## Features

Display a list of domains
Allow users to edit domain details
Allow users to delete domains
Modal for editing domain details
Error handling with toasts
Installation
Clone this repository.
Navigate to the frontend directory: cd frontend.
Install dependencies: npm install.
Usage
To start the development server, run:

### Installation

- Clone this repository to your local machine:

        git clone <frontend-repo-url>

- Navigate to the frontend directory:

        cd frontend
        Install dependencies:
        npm install

### Configuration

Before running the frontend application, ensure that the backend server is running and accessible. Update the REACT_APP_BACKEND_URL variable in the .env file with the URL of your backend server.

### Usage

- To start the development server, run:

        npm run dev

  This will start the frontend application on http://[localhost:5173](http://localhost:5173/).

### Features

- Display a list of domains
- Allow users to edit domain details
- Allow users to delete domains
- Modal for editing domain details
- Error handling with toasts


# <div align="center">Backend</div>

### Overview

This is the backend part of the application. It is built using Node.js and Express.js.

### Installation

- Clone this repository to your local machine:

        git clone <backend-repo-url>

* Navigate to the backend directory:

        cd backend

* Install dependencies:

        npm install

### Configuration

- Create a .env file in the backend directory.
- Define the following environment variables:

        PORT=8000
        MONGODB_URI=  <your_mongodb_uri>

Replace <your_mongodb_uri> with your MongoDB connection string.

### Usage

- To start the server, run:

        npm start

This will start the backend server on http://localhost:8000.


### API Endpoints
* GET /api/domains
* POST /api/domains
* GET /api/domains/:id
* PUT /api/domains/:id
* DELETE /api/domains/:id

## Tech Stack

### Frontend

- React
- Chakra UI
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing

### Contributing

Feel free to contribute to this project by opening issues or pull requests.
