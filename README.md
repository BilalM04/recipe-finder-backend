# Recipe Finder Backend API

Welcome to the Recipe Finder Backend API, a RESTful API created using Node.js and Express.js to handle interactions with a MongoDB database. This API serves as the backend for the Recipe Finder web application, facilitating seamless communication between the frontend and the database.

The hosted frontend application is accessible at [Recipe Finder](https://bilalm04.github.io/recipe-finder). The source code for the frontend can be found [here](https://github.com/BilalM04/recipe-finder).

## Technologies Used

- **Node.js:** JavaScript runtime for building scalable network applications.
- **Express.js:** Web application framework for Node.js, used to create the RESTful API.
- **MongoDB:** NoSQL database for storing user data and recipes.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv:** Module for loading environment variables from a `.env` file.

## How to Use

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BilalM04/recipe-finder-backend.git
   ```
   
2. **Install Dependencies:**
   ```bash
   cd recipe-finder-backend
   npm install
   ```

3. **Configure Environment Variables:** Create a `.env` file and fill in the following variables with your own credentials.
   ```env
   MONGODB_URI=
   PORT=
   ```

5. **Run the Server:**
   ```bash
   npm start
   ```
   
6. The API will be accessible at <http://localhost:PORT>.

## API Endpoints

### Get User's Recipes

**Endpoint:** `GET /:email`

**Description:** Retrieves the list of recipe URIs associated with a specific user.

**Parameters:**
- **`email` (path parameter):** The email address of the user.
  
**Response:**

- **200 OK:** Returns an array of recipe URIs.
  ```json
  [
    "recipe-uri-1",
    "recipe-uri-2",
    "recipe-uri-3"
  ]
  ```
- **404 Not Found:** User with the specified email does not exist.
  ```json
  {
    "message": "User not found"
  }
  ```
- **500 Internal Server Error:** Error occurred while processing the request.
  ```json
  {
    "message": "Error message"
  }
  ```

### Post New Recipe for User

**Endpoint:** `POST /:email`

**Description:** Adds a new recipe URI to the user's collection.

**Parameters:**
- **`email` (path parameter):** The email address of the user.
  
**Request Body:**
- **`uri` (string):** The URI of the recipe to be added.
  
**Response:**

- **201 Created:** Successfully added the recipe URI
   ```json
  {
    "uri": "recipe-uri"
  }
  ```
- **400 Bad Request:** Invalid URI provided.
  ```json
  {
    "message": "Invalid URI"
  }
  ```
- **409 Conflict:** Recipe URI already exists for the user.
  ```json
  {
    "message": "Recipe already exists for this user!"
  }
  ```
- **500 Internal Server Error:** Error occurred while processing the request.
  ```json
  {
    "message": "Error message"
  }
  ```

### Delete User's Recipe

**Endpoint:** `DELETE /:email/:uri`

**Description:** Removes a specific recipe URI from the user's collection.

**Parameters:**
- **`email` (path parameter):** The email address of the user.
- **`uri` (path parameter):** The URI of the recipe to be deleted (URL-encoded).
  
**Response:**

- **200 OK:** Successfully deleted the recipe URI.
   ```json
  {
    "message": "Recipe deleted successfully"
  }
  ```
- **400 Bad Request:** Invalid URI provided.
  ```json
  {
    "message": "Invalid URI"
  }
  ```
- **404 Not Found:** User with the specified email or recipe URI does not exist.
  ```json
  {
    "message": "User not found OR Recipe not found for this user"
  }
  ```
- **500 Internal Server Error:** Error occurred while processing the request.
  ```json
  {
    "message": "Error message"
  }
  ```
