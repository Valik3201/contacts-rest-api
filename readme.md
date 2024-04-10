# Contacts REST API

This project implements a REST API for managing contacts. It provides endpoints for listing contacts, retrieving a contact by ID, adding a new contact, updating an existing contact, and deleting a contact.

![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)
![Nodemon Badge](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=flat)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat)
![Mongoose Badge](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=flat)
![JSON Web Tokens Badge](https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=flat)

## Features

- **REST API Routes**: Implements routes for handling contacts using Express.js.
- **Data Handling Functions**: Includes functions for managing contact data, such as listing contacts, adding, updating, and deleting contacts.
- **Middleware Configuration**: Configures Express.js middleware for logging, CORS, and JSON parsing.
- **Data Validation**: Enhances data validation using Joi to ensure incoming data meets specified requirements.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Usage

- **GET /api/contacts**: Retrieves a list of all contacts.
- **GET /api/contacts/:id**: Retrieves a specific contact by ID.
- **POST /api/contacts**: Adds a new contact.
- **PUT /api/contacts/:id**: Updates an existing contact.
- **DELETE /api/contacts/:id**: Deletes a contact by ID.

## Technologies Used

- Node.js
- Nodemon
- Express.js
- Joi
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
