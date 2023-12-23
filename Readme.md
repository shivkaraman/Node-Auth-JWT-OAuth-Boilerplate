# Authentication Boilerplate

A simple authentication boilerplate for web applications using JSON Web Tokens (JWT).

## Overview

This repository provides a basic authentication setup for web applications with the following features:

-   **Signup:** `/auth/signup` - Register a new user.
-   **Login:** `/auth/login` - Authenticate and log in.
-   **Homepage:** `/` - Accessible to anyone.
-   **Restricted:** `/restricted` - Accessible only to authenticated users.

## Project Setup

### Prerequisites

-   Node.js installed
-   MongoDB installed

### Getting Started

1. **Download Repository:**

    - Download this repository and extract the files.

2. **Navigate to Server Directory:**
    ```bash
    cd server
    ```
3. **Install Dependencies:**
    ```bash
    npm install
    ```
4. **Create Environment File:**
   -Create a .env file in the server directory and fill in the following attributes:
    ```bash
    MONGO_URI=YourMongoDBConnectionString
    PORT_NO=3000
    JWT_SECRET=YourJWTSecretString
    ```
5. **Generate SSL Key and Certificate:**
    ```bash
    openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 36
    ```
6. **Run the Server:**
    ```bash
    node server.js
    ```

## Integration

This boilerplate can be easily integrated into any project with slight modifications. Customize the routes and authentication middleware based on your application's requirements.
