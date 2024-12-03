# MicroservicesUberRealTime

# `/users/register` Endpoint Documentation

## **Endpoint**:  
`POST /users/register`

## **Description**:
This endpoint allows new users to register by providing their first name, last name, email, and password. Upon successful registration, a user record is created in the database, and a JWT authentication token is returned.

---

## **Request**:
### **Headers**:
- `Content-Type: application/json`

### **Body**:
The request body should be in JSON format and must include the following fields:

| Field                | Type   | Required | Description                                     |
|----------------------|--------|----------|-------------------------------------------------|
| `fullname`           | Object | Yes      | Contains the user's first and last names.      |
| `fullname.firstname` | String | Yes      | The user's first name (minimum 3 characters).  |
| `fullname.lastname`  | String | No       | The user's last name (minimum 3 characters).   |
| `email`              | String | Yes      | The user's email address (must be valid and unique). |
| `password`           | String | Yes      | The user's password (minimum 6 characters).    |

#### **Example Request**:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "password123"
}
