# Contacts REST API

This project implements a REST API for managing contacts. It provides endpoints for listing contacts, retrieving a contact by ID, adding a new contact, updating an existing contact, and deleting a contact.

![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)
![Nodemon Badge](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=flat)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat)
![Mongoose Badge](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=flat)
![JSON Web Tokens Badge](https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=flat)
![.ENV Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=flat)
![Postman Badge](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=fff&style=flat)

## Features

- **Authentication and Authorization**: Secure routes with JWT-based authentication to protect sensitive data and ensure that only authorized users can access certain endpoints.
- **REST API Routes**: Implements routes for handling contacts using Express.js.
- **Data Handling Functions**: Includes functions for managing contact data, such as listing contacts, adding, updating, and deleting contacts.
- **Middleware Configuration**: Configures Express.js middleware for logging, CORS, and JSON parsing.
- **Data Validation**: Enhances data validation using Joi to ensure incoming data meets specified requirements.
- **Avatar Handling:** Allows users to upload and update their avatars using Multer for file uploads and Jimp for image manipulation.
- **Email Verification:** Implements email verification using Postmark to ensure that users verify their email addresses upon registration.

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

## API Reference

- **Authentication**:

  - **POST /api/auth/register**: Register a new user.
  - **POST /api/auth/login**: Authenticate a user and return a JWT.
  - **POST /api/users/logout**: Logout by invalidating the user's token.
  - **GET /api/auth/current**: Retrieves the current authenticated user's details.
  - **PATCH /api/auth/subscription**: Updates the subscription type of the authenticated user. Accepts one of the following values: 'starter', 'pro', 'business'.
  - **PATCH /api/auth/avatars:** Updates the avatar of the authenticated user.
  - **POST /api/users/verify:** Resends the verification email to the user.

- **Contact Operations**:
  - **GET /api/contacts**: Retrieves a list of all contacts. Supports pagination and filtering by favorite status.
  - **GET /api/contacts/:id**: Retrieves a specific contact by ID.
  - **POST /api/contacts**: Adds a new contact.
  - **PUT /api/contacts/:id**: Updates an existing contact.
  - **DELETE /api/contacts/:id**: Deletes a contact by ID.
 
For detailed API documentation, please refer to [API Reference](./API_Reference.md).

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js allows for efficient server-side scripting and is well-suited for building scalable network applications.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server, providing a seamless development experience.
- **Express.js**: Web application framework for Node.js, designed for building web applications and APIs. Express.js simplifies the process of handling HTTP requests and responses.
- **Joi**: A powerful schema description language and data validator for JavaScript. Joi provides a convenient way to validate and sanitize input data, ensuring data integrity and security.
- **MongoDB**: A NoSQL database designed to handle large amounts of data and dynamic schemas. MongoDB's flexible document-based model is well-suited for storing unstructured data like contacts. Its scalability and performance make it a popular choice for modern applications.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose provides a straightforward way to define schemas, perform CRUD operations, and perform data validation.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties. JWTs are widely used for authentication and authorization in stateless applications, providing a secure and efficient way to manage user sessions.
- **bcrypt**: A library to help you hash passwords securely. bcrypt is a popular choice for password hashing due to its resistance to brute-force attacks and its adjustable computational cost, making it suitable for varying security requirements.
- **Multer:** A middleware for handling multipart/form-data, used for uploading files in Node.js applications.
- **Jimp:** An image processing library for Node.js, used for resizing and manipulating images.

### Why MongoDB?

MongoDB was chosen for this project due to its suitability for storing contact data. Here are some reasons why MongoDB was preferred over traditional SQL databases:

- **Flexible Schema**: MongoDB's document-oriented data model allows for flexible and dynamic schemas, making it easy to store and retrieve complex data structures like contacts without the need for predefined schemas.
- **Scalability**: MongoDB is designed to scale horizontally, allowing for seamless scalability as your data grows. It can handle large volumes of data and high throughput workloads with ease.
- **Query Performance**: MongoDB's query language and indexing capabilities provide efficient querying and retrieval of data, ensuring fast response times even with large datasets.
- **Developer Productivity**: MongoDB's JSON-like document format and intuitive query language make it easy for developers to work with, reducing development time and complexity.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
