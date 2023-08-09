# BACKEND-SYSTEM DOCUMENTATION

Welcome to the documentation for the backend system of our application. This guide provides a comprehensive overview of the APIs and functionality offered by the backend system.

Table of Contents
1. User Registration
2. Generate Token
3. Store Data
3.1. Request
3.2. Response
3.3. Error Codes
4. Retrieve Data
4.1. Request
4.2. Response
4.3. Error Codes
5. Update Data
5.1. Request
5.2. Response
5.3. Error Codes
6. Delete Data
6.1. Request
6.2. Response
6.3. Error Codes
How to Run the Code
Setup Instructions


  1.User Registration:-
This endpoint is used to register a new user.
Endpoint: POST /api/register
Request:
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "secure_password123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
}

Success Response:
{
  "status": "success",
  "message": "User successfully registered!",
  "data": {
    "user_id": "12345",
    "username": "example_user",
    "email": "user@example.com",
    "full_name": "John Doe",
    "age": 30,
    "gender": "male"
  }

Error Responses:
INVALID_REQUEST: Invalid request. Please provide all required fields.
USERNAME_EXISTS: The provided username is already taken.
EMAIL_EXISTS: The provided email is already registered.
INVALID_PASSWORD: The provided password does not meet the requirements.
INVALID_AGE: Invalid age value.
GENDER_REQUIRED: Gender field is required.

2. Generate Token:-
This endpoint generates an access token for authentication.

Endpoint: POST /api/token

Request:
{
  "username": "example_user",
  "password": "secure_password123"
}

Response:
{
  "status": "success",
  "message": "Access token generated successfully.",
  "data": {
    "access_token": "<TOKEN>",
    "expires_in": 3600
  }

Error Responses:
INVALID_CREDENTIALS: Invalid credentials. The provided username or password is incorrect.
MISSING_FIELDS: Missing fields. Please provide both username and password.
INTERNAL_ERROR: Internal server error occurred.

3. Store Data:-
Stores a key-value pair in the database.

Endpoint: POST /api/data

3.1. Request
Request Headers:
Authorization: Bearer access_token

Request Body:
{
  "key": "unique_key",
  "value": "data_value"
}

3.2. Response:
{
  "status": "success",
  "message": "Data stored successfully."
}

3.3. Error Codes:
INVALID_KEY: The provided key is not valid or missing.
INVALID_VALUE: The provided value is not valid or missing.
KEY_EXISTS: The provided key already exists in the database. To update an existing key, use the update API.
INVALID_TOKEN: Invalid access token provided.

4. Retrieve Data:-
Retrieves the value associated with a specific key.

Endpoint: GET /api/data/{key}

4.1. Request
Request Headers:
Authorization: Bearer access_token

4.2. Response:
{
  "status": "success",
  "data": {
    "key": "unique_key",
    "value": "data_value"
  }

4.3. Error Codes:
KEY_NOT_FOUND: The provided key does not exist in the database.
INVALID_TOKEN: Invalid access token provided.

5. Update Data:-
Updates the value associated with an existing key.

Endpoint: PUT /api/data/{key}

5.1. Request
Request Headers:
Authorization: Bearer access_token

Request Body:
{
  "value": "new_data_value"
}

5.2. Response:
{
  "status": "success",
  "message": "Data updated successfully."
}
5.3. Error Codes:
KEY_NOT_FOUND: The provided key does not exist in the database.
INVALID_TOKEN: Invalid access token provided.

6. Delete Data:-
Deletes a key-value pair from the database.

Endpoint: DELETE /api/data/{key}

6.1. Request
Request Headers:
Authorization: Bearer access_token

6.2. Response:
{
  "status": "success",
  "message": "Data deleted successfully."
}

6.3. Error Codes:
KEY_NOT_FOUND: The provided key does not exist in the database.
INVALID_TOKEN: Invalid access token provided.

How to Run the Code:-
Clone the repository to your local machine.
Install the required dependencies using npm install.
Start the server by running node index.js.

Setup Instructions:-
Install Node.js and npm on your system.
Clone this repository.
Run npm install to install the required packages.
Configure your database connection by updating the db.js file.
Run the server using node index.js.
