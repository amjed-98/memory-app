# Memory App

The Memory App is a web application that allows users to create memories, leave comments, like and share posts, and search for memories using text and tags. This README provides an overview of the project and instructions for running the application.

## Features

The Memory App includes the following features:

- Users can create memories with a title, description, related tags, and images.
- Users can leave comments on other users' memories.
- Users can like and share posts to engage with the community.
- The app provides a search feature to find memories using text and tags.

## API Documentation

You can explore the API endpoints using the provided Postman collection. The collection contains pre-defined requests that you can use to interact with the Memory App API.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/22871956-ee227de9-e68a-4969-8ab0-7d077111e46e?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D22871956-ee227de9-e68a-4969-8ab0-7d077111e46e%26entityType%3Dcollection%26workspaceId%3D15013a68-0290-4731-bf05-294e304b14e1)



## Prerequisites

To run the Memory App, ensure that you have the following dependencies installed on your machine:

- Node.js (optional if you're using docker)
- MongoDB (optional if you're using docker)
- docker (optional)
- docker-compose (optional)

## Setup

### Docker Setup

To run the Memory App using Docker, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd memory-app`
3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables, such as database connection details.
4. Build the Docker images and start the containers: `docker-compose up -d`
5. Access the application in your browser at `http://localhost:8080`.

### Local Setup

To run the Memory App locally without Docker, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd memory-app`
3. Install the dependencies: `pnpm install`
4. Configure the environment variables:
   - Create a `.env` or rename .env.example file in the root directory.
   - Add the necessary environment variables, such as database connection details.
5. Start the application: `pnpm start`
6. Access the application in your browser at `http://localhost:8080`.


## Folder Structure

The project follows a recommended folder structure for better organization and maintainability. Here's an overview of the main folders and their purpose:

- **controllers**: Contains the controller files that handle the request/response flow and interact with services.
- **models**: Contains the Mongoose models for defining data schemas and interacting with the database.
- **routes**: Contains the route files that define the API endpoints and their associated controller actions.
- **utils**: Contains utility files or helper functions that can be used across the application.
- **config**: Contains configuration files, such as database configuration or environment variables.

## Technologies Used

The Memory App is built using the following technologies:

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- Zod

## Contributing

Contributions to the Memory App are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

The Memory App is released under the [MIT License](LICENSE).
