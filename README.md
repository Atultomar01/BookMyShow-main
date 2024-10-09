# Project: [BookMyShow](https://bookmyshow-almabetter.netlify.app/) Website

This is the web application for booking and managing movie tickets, events, and shows. It is built using React for the frontend, Express for the backend, and MongoDB as the database. Bootstrap is used for the styling of the frontend.

## Table of Contents

* Features
* Prerequisites
* Installation
* Configuration
* Usage
* Folder Structure
* Dependencies
* Contributors

### Features

* Select your movie.
* Book time & seat for movie.
* Integration with MongoDB for data storage.
* Responsive design using Bootstrap for frontend.

### Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js and npm installed.
* MongoDB database setup.

### Installation

1. Clone the repository.
2. Install npm.
3. Install node.
4. Install express.
5. Install bootstrap.

### Configuration

You need to set up your environment variables and configuration files. Please follow these steps:
1. Create a .env file in the server directory and add the following:

* MONGODBURI = mongodb://127.0.0.1:27017/bookMovie 
* MONGODBLIVE = mongodb+srv://rdey5486:iJfbAZorfg4zex5q@cluster0.sukyqob.mongodb.net/
* COLLECTION_NAME = bookmovietickets
* NODE_ENV =  development
* APP_PORT = 4000 
* GET_REQUEST = /api/booking
* POST_REQUEST = /api/booking

2. Update the client's configuration if needed (e.g., API endpoints).

### Usage

1. Start the server:
    - cd src
    - npm start

2. Start the client:
    - cd client
    - npm start

### Folder Structure
    
* client = Contains the React frontend.
* src = Contains the Express backend.
* public = Public assets and static files.

### Dependencies

This project uses the following major libraries and frameworks:

1. ReactJS (frontend)
2. ExpressJS (backend)
3. MongoDB (database)
4. Bootstrap (styling)

For a full list of dependencies, please check the package.json files in both the client and server directories.

### Contributors

This project was worked on by the following individuals:

* [Sarvesh Kumar](https://github.com/Sarveshkumar0611)
* [Bhaskar Bhardwaj](https://github.com/Bhashkarkumar)
* [Rajdeep Dey](https://github.com/RajdeepDey010)

If you have any questions or need further assistance, please feel free to reach out to any of the contributors.



Enjoy using your bookmyshow website!

#### Happy Coding!

![bookmyshow](https://github.com/deevesh11nov/BookmyShow/assets/127090783/9c9d01e5-7dde-4e46-8635-3fe1dd6c453d)
