# Youtube-Backend

A backend API for a video-sharing platform inspired by YouTube. This project provides core functionalities such as user authentication, video upload/streaming, comments, likes, and subscriptions.

## Features

- User registration & authentication (JWT)
- Video upload, streaming, and management
- Commenting system
- Like/dislike videos
- Subscribe/unsubscribe to channels
- RESTful API endpoints

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for file uploads

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/Youtube-Backend.git
    cd Youtube-Backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file with:
      ```
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```

4. **Run the server:**
    ```bash
    npm start
    ```

## API Endpoints

| Method | Endpoint                | Description                |
|--------|------------------------|----------------------------|
| POST   | `/api/auth/register`   | Register a new user        |
| POST   | `/api/auth/login`      | Login user                 |
| POST   | `/api/videos`          | Upload a new video         |
| GET    | `/api/videos/:id`      | Get video details/stream   |
| POST   | `/api/videos/:id/like` | Like/dislike a video       |
| POST   | `/api/comments`        | Add a comment              |
| GET    | `/api/comments/:id`    | Get comments for a video   |
| POST   | `/api/subscribe/:id`   | Subscribe to a channel     |

## Folder Structure

```
/controllers
/models
/routes
/middleware
/uploads
```

## License

MIT
