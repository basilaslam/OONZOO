# API Documentation

## Authentication

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: User login
- **Request Body**:
  - `email` (string, required): User email
  - `password` (string, required): User password
- **Responses**:
  - `200 OK`: User logged in successfully
  - `401 Unauthorized`: Invalid credentials

### Signup

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: User signup
- **Request Body**:
  - `email` (string, required): User email
  - `username` (string, required): Username
  - `password` (string, required): User password
  - `role` ("USER"||"ADMIN"): Role of the user
- **Responses**:
  - `201 Created`: User registered successfully
  - `400 Bad Request`: Invalid request

## Products

### Get Products

- **URL**: `/products`
- **Method**: `GET`
- **Description**: Get a list of products
- **Parameters**:
  - `page` (number, query, optional): Page number (default: 1)
  - `pageSize` (number, query, optional): Number of items per page (default: 10)
- **Responses**:
  - `200 OK`: List of products
  - `500 Internal Server Error`: Server error