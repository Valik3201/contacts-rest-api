# API Documentation

## Authentication Endpoints

#### Prefix Path: `/api/auth`

> [!NOTE]  
> For all `authentication` endpoints, make sure to prepend `/api/auth` to the endpoint paths.

### Register

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User's email address |
| `password`| `string` | **Required**. User's password |

- **Description:** Register a new user.
- **Responses:**
  - `201 Created`: User successfully registered.
    ```json
    {
      "user": {
        "email": "user@example.com",
        "subscription": "starter"
      }
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `409 Conflict`: Email already in use.
  - `500 Internal Server Error`: Server error during registration process.

### Login

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User's email address |
| `password`| `string` | **Required**. User's password |

- **Description:** Log in an existing user.
- **Responses:**
  - `200 OK`: Successful login.
    ```json
    {
      "token": "<JWT token>",
      "user": {
        "email": "user@example.com",
        "subscription": "starter"
      }
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `401 Unauthorized`: Email or password is incorrect or email is not verified.
  - `500 Internal Server Error`: Server error during login process.

### Logout

```http
  POST /logout
```

- **Authorization:** Bearer token in the Authorization header.
- **Description:** Log out the current user.
- **Responses:**
  - `204 No Content`: Successfully logged out.
  - `401 Unauthorized`: Not authorized or invalid token.
  - `500 Internal Server Error`: Server error during logout process.

### Get Current User

```http
  GET /current
```

- **Authorization:** Bearer token in the Authorization header.
- **Description:** Get information about the current user.
- **Responses:**
  - `200 OK`: Successful retrieval of current user's information.
    ```json
    {
      "email": "user@example.com",
      "subscription": "starter"
    }
    ```
  - `401 Unauthorized`: Not authorized or invalid token.
  - `500 Internal Server Error`: Server error during retrieval process.

### Update Subscription

```http
  PATCH /subscription
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `subscription`| `string` | **Required**. New subscription plan |

- **Authorization:** Bearer token in the Authorization header.
- **Description:** Update the subscription of the current user.
- **Request Body:**
  - `subscription` (string, required): New subscription plan ("starter", "pro", "premium").
- **Responses:**
  - `200 OK`: Subscription updated successfully.
    ```json
    {
      "email": "user@example.com",
      "subscription": "pro"
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `401 Unauthorized`: Not authorized or invalid token.
  - `500 Internal Server Error`: Server error during subscription update process.

### Verify Email

```http
  GET /verify/:verificationToken
```

| Parameter            | Type     | Description                       |
| :------------------- | :------- | :-------------------------------- |
| `verificationToken` | `string` | **Required**. Verification token received via email |

- **Description:** Verify user's email using verification token sent via email.
- **Responses:**
  - `200 OK`: Email verification successful.
    ```json
    {
      "message": "Email verification successful"
    }
    ```
  - `404 Not Found`: User not found with the provided verification token.
  - `500 Internal Server Error`: Server error during email verification process.

### Resend Verification Email

```http
  POST /verify
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. User's email address |

- **Description:** Resend email verification link to the user.
- **Responses:**
  - `200 OK`: Verification email sent successfully.
    ```json
    {
      "message": "Verification email sent"
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `404 Not Found`: User not found with the provided email.
  - `500 Internal Server Error`: Server error during email resend process.

### Upload Avatar

```http
  PATCH /avatars
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `avatar`  | `file`   | **Required**. Avatar image file to be uploaded. Must be an image file (e.g., JPEG, PNG). |

- **Description:** Upload a user's avatar image.
- **Responses:**
  - `200 OK`: Avatar uploaded successfully.
    ```json
    {
      "message": "Avatar uploaded successfully",
      "avatarUrl": "https://example.com/uploads/avatar.jpg"
    }
    ```
  - `400 Bad Request`: Invalid file format or missing avatar file.
  - `500 Internal Server Error`: Server error during avatar upload process.

## Contact Endpoints

#### Prefix Path: `/api/contacts`

> [!NOTE]  
> For all `contacts` endpoints, make sure to prepend `/api/contacts` to the endpoint paths.

#### Authorization

> [!IMPORTANT]  
> For all `contacts` endpoints, make sure to include the Bearer token in the Authorization header.

### Get Contacts

```http
GET /contacts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`    | `number` | Page number for pagination.      |
| `limit`   | `number` | Number of contacts per page.     |
| `favorite`| `boolean`| Filter contacts by favorite status. |

- **Description:** Get a list of contacts.
- **Responses:**
  - `200 OK`: Successful retrieval of contacts.
    ```json
    [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "favorite": true
      },
      {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "987-654-3210",
        "favorite": false
      }
    ]
    ```
  - `500 Internal Server Error`: Server error during contacts retrieval process.

### Get Contact by ID

```http
GET /contacts/:contactId
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `contactId`  | `string` | ID of the contact to retrieve.    |

- **Description:** Get a contact by its ID.
- **Responses:**
  - `200 OK`: Successful retrieval of contact.
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "favorite": true
    }
    ```
  - `404 Not Found`: Contact not found with the provided ID.
  - `500 Internal Server Error`: Server error during contact retrieval process.

### Create Contact

```http
POST /contacts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | Name of the contact.              |
| `email`   | `string` | Email address of the contact.     |
| `phone`   | `string` | Phone number of the contact.      |
| `favorite`| `boolean`| Favorite status of the contact.   |

- **Description:** Create a new contact.
- **Responses:**
  - `201 Created`: Contact created successfully.
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "favorite": false
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `500 Internal Server Error`: Server error during contact creation process.

### Delete Contact

```http
DELETE /contacts/:contactId
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `contactId`  | `string` | ID of the contact to delete.      |

- **Description:** Delete a contact by its ID.
- **Responses:**
  - `200 OK`: Contact deleted successfully.
    ```json
    {
      "message": "Contact deleted"
    }
    ```
  - `404 Not Found`: Contact not found with the provided ID.
  - `500 Internal Server Error`: Server error during contact deletion process.

### Update Contact

```http
PUT /contacts/:contactId
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `contactId`  | `string` | ID of the contact to update.      |
| `name`       | `string` | Updated name of the contact.      |
| `email`      | `string` | Updated email address of the contact. |
| `phone`      | `string` | Updated phone number of the contact. |

- **Description:** Update a contact by its ID.
- **Responses:**
  - `200 OK`: Contact updated successfully.
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com",
      "phone": "987-654-3210",
      "favorite": true
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `404 Not Found`: Contact not found with the provided ID.
  - `500 Internal Server Error`: Server error during contact update process.

### Update Contact Favorite Status

```http
PATCH /contacts/:contactId/favorite
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `contactId`  | `string` | ID of the contact to update.      |
| `favorite`   | `boolean`| Updated favorite status of the contact. |

- **Description:** Update the favorite status of a contact by its ID.
- **Responses:**
  - `200 OK`: Contact favorite status updated successfully.
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "favorite": true
    }
    ```
  - `400 Bad Request`: Validation error or missing required fields.
  - `404 Not Found`: Contact not found with the provided ID.
  - `500 Internal Server Error`: Server error during contact favorite status update process.
