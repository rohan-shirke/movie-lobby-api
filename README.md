### Setting up and running the movie-lobby-api

1. **Clone the Repository:**
   Clone the repository containing the movie-lobby-api code to your local machine.

2. **Install Dependencies:**
   Navigate to the project directory and run the following command to install the dependencies:
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root directory of the project and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/movie_database
   ```

4. **Start MongoDB:**
   Ensure that MongoDB is running on your local machine. If not, start the MongoDB service.

5. **Run the API:**
   Once MongoDB is running, start the API by running the following command:
   ```bash
   npm start
   ```

6. **Access the API:**
   The API will be accessible at `http://localhost:3000/`.

### API Documentation:

#### Endpoints:

- `GET /movies`: Get all movies in the lobby.
- `GET /search?q={query}`: Search for a movie by title or genre.
- `POST /movies`: Add a new movie to the lobby.
- `PUT /movies/:id`: Update an existing movie's information.
- `DELETE /movies/:id`: Delete a movie from the lobby.

#### Sample Requests and Responses:

- **GET /movies**
  - Request:
    ```bash
    curl http://localhost:3000/movies
    ```
  - Response:
    ```json
    [
      {
        "title": "Movie 1",
        "genre": "Action",
        "rating": 8.5,
        "streamingLink": "https://example.com/movie1"
      },
      {
        "title": "Movie 2",
        "genre": "Comedy",
        "rating": 7.9,
        "streamingLink": "https://example.com/movie2"
      }
    ]
    ```

- **GET /search?q=Action**
  - Request:
    ```bash
    curl http://localhost:3000/search?q=Action
    ```
  - Response:
    ```json
    [
      {
        "title": "Movie 1",
        "genre": "Action",
        "rating": 8.5,
        "streamingLink": "https://example.com/movie1"
      }
    ]
    ```

- **POST /movies**
  - Request:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"title": "New Movie", "genre": "Drama", "rating": 9.0, "streamingLink": "https://example.com/newmovie"}' http://localhost:3000/movies
    ```
  - Response:
    ```json
    {
      "title": "New Movie",
      "genre": "Drama",
      "rating": 9.0,
      "streamingLink": "https://example.com/newmovie"
    }
    ```

- **PUT /movies/:id**
  - Request:
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"genre": "Thriller", "rating": 8.5}' http://localhost:3000/movies/60ff89f3c46da4f8a68d1b43
    ```
  - Response:
    ```json
    {
      "title": "Updated Movie",
      "genre": "Thriller",
      "rating": 8.5,
      "streamingLink": "https://example.com/updatedmovie"
    }
    ```

- **DELETE /movies/:id**
  - Request:
    ```bash
    curl -X DELETE http://localhost:3000/movies/60ff89f3c46da4f8a68d1b43
    ```
  - Response:
    ```json
    {
      "message": "Movie deleted successfully"
    }
    ```

### Test Cases:

Test cases are written using Jest and Supertest to ensure the API functions correctly. Test files are located in the `src/controllers` directory with the `.spec.ts` extension.

To run the tests, use the following command:
```bash
npm test
```

Ensure that MongoDB is running on your local machine before running the tests.
