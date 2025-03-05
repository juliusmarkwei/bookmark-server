# Bookmark API

This is a Bookmark API built with NestJS and Prisma. The API allows users to create, update, delete, and fetch bookmarks. It also includes authentication using JWT.

## Table of Contents

- [Bookmark API](#bookmark-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Bookmarks](#bookmarks)
  - [Environment Variables](#environment-variables)
  - [Prisma Schema](#prisma-schema)
  - [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/bookmark-api.git
    cd bookmark-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. Generate Prisma client:
    ```bash
    npx prisma generate
    ```

5. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

## Running the Application

To start the application, run:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Auth

- **POST /auth/signup**: Register a new user.
    - Request Body:
        ```json
        {
            "email": "user@example.com",
            "password": "password",
            "fullName": "User Name"
        }
        ```

- **POST /auth/login**: Login a user.
    - Request Body:
        ```json
        {
            "email": "user@example.com",
            "password": "password"
        }
        ```

### Bookmarks

- **GET /bookmarks**: Fetch all bookmarks for the authenticated user.
    - Headers:
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

- **POST /bookmarks**: Create a new bookmark.
    - Headers:
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - Request Body:
        ```json
        {
            "title": "Bookmark Title",
            "description": "Bookmark Description",
            "link": "https://example.com"
        }
        ```

- **PATCH /bookmarks/:bookmarkId**: Update a bookmark.
    - Headers:
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```
    - Request Body:
        ```json
        {
            "title": "Updated Title",
            "description": "Updated Description",
            "link": "https://updated-link.com"
        }
        ```

- **DELETE /bookmarks/:bookmarkId**: Delete a bookmark.
    - Headers:
        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

## Environment Variables

- `DATABASE_URL`: The URL of the PostgreSQL database.
- `JWT_SECRET`: The secret key used for signing JWT tokens.

## Prisma Schema

The Prisma schema defines the database models for the application.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String     @id @default(uuid())
  email     String     @unique
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  fullName  String
  bookmarks Bookmark[]
}

model Bookmark {
  id          String   @id @default(uuid())
  userId      String
  title       String
  description String?
  link        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])

  @@unique([userId, link])
}
```

## License

This project is licensed under the MIT License.
