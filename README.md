# Microservices Uber Real Time

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
 -`fullname`: (object).
        -`firstname` (string): User's first name (minimum 3 charecter).
        -`lastname` (string): User's last name (minimum 3 charecter).
    -`email` (string) : User's email address (must be a valid email address)
    -`password` (string): User's password (minimum of 6 charecter)

#### **Example Response**:
- `user` (object):
    -`fullname`: (object).
        -`firstname` (string): User's first name (minimum 3 charecter).
        -`lastname` (string): User's last name (minimum 3 charecter).
    -`email` (string) : User's email address (must be a valid email address)
    -`password` (string): User's password (minimum of 6 charecter)
    -`token` (string): JWT Token

# `/users/login`Endpoint Documentation

## **Description**:
This endpoint allows registered users to log in by providing their email and password. Upon successful login, a JWT authentication token is returned, along with user details.

---

## **Request**:
### **Headers**:
- `Content-Type: application/json`

### **Body**:
The request body should be in JSON format and must include the following fields:

| Field     | Type   | Required | Description                                   |
|-----------|--------|----------|-----------------------------------------------|
| `email`   | String | Yes      | The user's email address (must be valid).    |
| `password`| String | Yes      | The user's password (minimum 6 characters).  |

#### **Example Request**:
 -`email` (string) : User's email address (must be a valid email address)
-`password` (string): User's password (minimum of 6 charecter)

### **Example Response**:
- `user` (object):
    -`fullname`: (object).
        -`firstname` (string): User's first name (minimum 3 charecter).
        -`lastname` (string): User's last name (minimum 3 charecter).
    -`email` (string) : User's email address (must be a valid email address)
    -`password` (string): User's password (minimum of 6 charecter)
    -`token` (string): JWT Token

## `/captain/register` Endpoint Documentation

### **Endpoint**:  
`POST /captain/register`

### **Description**:
This endpoint allows new captains to register by providing their first name, last name, email, password, and vehicle details. Upon successful registration, a captain record is created in the database, and a JWT authentication token is returned.

---

### **Request**:

#### **Headers**:
- `Content-Type: application/json`

#### **Body**:
The request body should be in JSON format and must include the following fields:

| Field                | Type    | Required | Description                                                                 |
|----------------------|---------|----------|-----------------------------------------------------------------------------|
| `fullname`           | Object  | Yes      | Contains the captain's first and last names.                               |
| `fullname.firstname` | String  | Yes      | The captain's first name (minimum 3 characters).                           |
| `fullname.lastname`  | String  | No       | The captain's last name (minimum 3 characters).                            |
| `email`              | String  | Yes      | The captain's email address (must be valid and unique).                    |
| `password`           | String  | Yes      | The captain's password (minimum 6 characters).                             |
| `vehicle`            | Object  | Yes      | Contains the vehicle details.                                              |
| `vehicle.color`      | String  | Yes      | The color of the captain's vehicle (minimum 3 characters).                 |
| `vehicle.plate`      | String  | Yes      | The vehicle's license plate number (minimum 3 characters).                 |
| `vehicle.capacity`   | Integer | Yes      | The seating capacity of the vehicle (minimum value: 1).                    |
| `vehicle.vehicleType`| String  | Yes      | The type of vehicle (must be one of: `car`, `motorcycle`, or `auto`).      |


#### **Example Request**:
 -`fullname`: (object).
        -`firstname` (string): User's first name (minimum 3 charecter).
        -`lastname` (string): User's last name (minimum 3 charecter).
    -`email` (string) : User's email address (must be a valid email address)
    -`password` (string): User's password (minimum of 6 charecter)
    -`vehicle` (object): Contains the vehicle details.
        -`color` (string): The color of the user's vehicle (minimum 3 charecter)
        -`plate` (string): The plate Number of the user's vehicle (minimum 6 charecter)
        -`capacity` (string): The color of the user's vehicle capacity
        -`vehicleType` (string): The color of the user's vehicle type

#### **Example Response**:

 -`fullname`: (object).
        -`firstname` (string): User's first name (minimum 3 charecter).
        -`lastname` (string): User's last name (minimum 3 charecter).
    -`email` (string) : User's email address (must be a valid email address)
    -`password` (string): User's password (minimum of 6 charecter)
    -`vehicle` (object): Contains the vehicle details.
        -`color` (string): The color of the user's vehicle (minimum 3 charecter)
        -`plate` (string): The plate Number of the user's vehicle (minimum 6 charecter)
        -`capacity` (string): The color of the user's vehicle capacity
        -`vehicleType` (string): The color of the user's vehicle type 
 -`token`(string): JWT Token