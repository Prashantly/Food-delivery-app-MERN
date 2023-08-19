# TastyHub - Food Delivery App

TastyHub is a full-stack food delivery app built with the MERN stack, allowing users to order delicious food items online. This README file provides an overview of the project, its features, and instructions for setting up and running the application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

## Features

TastyHub offers the following key features:

- User Authentication: Users can sign up and log in to the website securely.
- Search for Food Items: Users can search for food items available on the platform.
- Users can add food items to their cart, adjust quantities, and select sizes (half or full).
- Responsive Design: The website is designed to be responsive, ensuring a great user experience on various devices.
- Order History: Logged-in users can view their order history with dates on the My Orders page.
- Checkout: Users can check out from their cart, and the order will be visible in the My Orders page.
- Modal Cart: Cart items are displayed in a modal, making it easy for users to interact with their cart.

## Technologies Used

TastyHub is built using the following technologies:

### Frontend

- React
- React Router
- React Bootstrap
- Axios
- React Hot Toast (for notifications)
- React Lazy Load Image Component (for lazy loading images)

### Backend

- Express.js
- MongoDB (with Mongoose for database operations)
- JWT for authentication
- Passport.js for authentication middleware
- Bcrypt for password hashing
- Express Validator for request validation
- CORS for handling cross-origin requests
- Dotenv for environment variable management

## Getting Started

To get the TastyHub project up and running on your local machine, follow these instructions.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB database set up.

### Installation

Clone the repository:

1. git clone `https://github.com/Prashantly/Food-delivery-app-MERN.git`.

2. Navigate to the project directory:
   `cd Food-delivery-app-MERN`

3. Install the frontend dependencies:

   - `cd tastyhub_react`
   - `npm install`

4. Install the backend dependencies:
   - `cd ../server`
   - `npm install`

## Configuration

Create a .env file in the server directory and configure the following environment variables:

```
PORT = 5000
SECRETKEY = your_jwt_secret_key
MONGO_URL = your_mongodb_connection_string
```

Replace your_mongodb_connection_string and your_jwt_secret_key with your MongoDB connection string and a secret key for JWT token generation.

## Usage

1. Start the backend server:

- cd server
- npm start

2. Start the frontend development server:

- cd client
- npm start

Access the TastyHub web application in your browser at http://localhost:3000.

## Deployment

Access the TastyHub web application in your browser at [TastyHub](https://tastyhub-mern.netlify.app/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
