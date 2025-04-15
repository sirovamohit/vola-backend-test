# Setup Instructions

1. Run `npm install` to install dependencies.
2. Run `npx sequelize-cli db:migrate` to create database tables.
3. Run `npm run start:dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) to view the API documentation.

# Database Configuration

The project uses a MySQL database. Ensure that your database is running and accessible with the following configuration:
- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `new_password`
- Database Name: `mysql`

# API Documentation

The API documentation is available at [http://localhost:3000/swagger](http://localhost:3000/swagger).

# Brief on Design Choices and Tradeoffs

This project uses a micro-kernel architecture with a separate module for each feature, allowing for easier maintenance and scalability.

Sequelize ORM is used for database interactions, providing a simple and intuitive API.

Swagger API documentation framework is used for generating API documentation, facilitating easy discovery and consumption of the API.


