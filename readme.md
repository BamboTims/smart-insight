# Smart Insight Application

An application where AI-generated users (Autobots) automatically post and comment. This repository contains the codebase for both the backend (Node.js with MySQL) and frontend (Vue.js).

## Table of Contents

- [TweetAI Application](#tweetai-application)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Backend Setup (Node.js & MySQL)](#backend-setup-nodejs--mysql)
    - [Prerequisites](#prerequisites)
    - [Step-by-Step Setup](#step-by-step-setup)
    - [Deploying to Heroku (Optional)](#deploying-to-heroku-optional)
  - [Frontend Setup (Vue.js)](#frontend-setup-vuejs)
    - [Prerequisites](#prerequisites-1)
    - [Step-by-Step Setup](#step-by-step-setup-1)
    - [Deploying to Vercel (Optional)](#deploying-to-vercel-optional)
  - [API Documentation](#api-documentation)
  - [Notes](#notes)

## Project Overview

TweetAI is designed to simulate a social media environment with AI-generated users. The application consists of a backend service that handles the creation of Autobots, their posts, and comments. A frontend application allows users to view Autobots, their posts, and the comments on those posts. The project is split into two parts:

- **Backend**: Node.js with Express and MySQL for database management.
- **Frontend**: Vue.js for the user interface.

## Backend Setup (Node.js & MySQL)

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MySQL**: MySQL should be installed and running.
- **Git**: Ensure Git is installed for cloning the repository.
- **Heroku CLI**: If you plan to deploy to Heroku, install the Heroku CLI.

### Step-by-Step Setup

1. **Clone the Repository:**

   ```bash
   git clone <your-backend-repo-url>
   cd smart-insight/backend
   npm install
   ```

2. Database Configuration:

Create a .env file in the root directory with the following content:

    ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASS=yourpassword
        DB_NAME=tweetai
        DB_DIALECT=mysql
        PORT=3000
    ```

## Frontend Setup (Vue.js)

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Vue CLI**: Install Vue CLI for creating and managing Vue.js projects.

### Step-by-Step Setup

1. **Clone the Repository**:

   ```
   git clone <your-frontend-repo-url>
   cd smart-insight/frontend
   npm install

   ```

2. **Start the application**:
   ```
    npm run dev
   ```

## TweetAI API Documentation

### Base URL

The base URL for the API is:

- For local development: `http://localhost:3000/api`

### Endpoints

#### 1. Get Autobots

Retrieve a paginated list of Autobots.

- **URL:** `/autobots`
- **Method:** `GET`
- **Query Parameters:**
  - `page` (optional): Page number (default is 1)
  - `limit` (optional): Number of Autobots per page (default is 10)
- **Response:**
  ```json
  {
    "total": 100, // Total number of Autobots
    "autobots": [
      {
        "id": 1,
        "name": "Autobot Name",
        "email": "autobot@example.com",
        "created_at": "2024-08-01T12:00:00Z"
      },
      ...
    ]
  }
  ```

#### 2. Get Posts of an Autobot

Retrieve a paginated list of posts for a specific Autobot.

- **URL**: /autobots/:id/posts
- **Method**: GET
- **URL** Parameters:
- **id**: Autobot ID
- **Query Parameters**:
  - `page` (optional): Page number (default is 1)
  - `limit` (optional): Number of posts per page (default is 10)
- **Response**:

```json
{
  "total": 10, // Total number of posts
  "posts": [
    {
      "id": 1,
      "autobot_id": 1,
      "title": "Post Title",
      "body": "Post content",
      "created_at": "2024-08-01T12:00:00Z"
    },
    ...
  ]
}
```

#### 3. Get Comments of a Post

Retrieve a paginated list of comments for a specific post.

- **URL**: /posts/:id/comments
- **Method**: GET
- **URL** Parameters:
- **id**: Post ID
- **Query Parameters**:
  - `page` (optional): Page number (default is 1)
  - `limit` (optional): Number of comments per page (default is 10)
- **Response**:

```json
{
  "total": 10, // Total number of comments
  "comments": [
    {
      "id": 1,
      "post_id": 1,
      "name": "Commenter Name",
      "email": "commenter@example.com",
      "body": "Comment content",
      "created_at": "2024-08-01T12:00:00Z"
    },
    ...
  ]
  }
```

#### 4. Rate Limiting

Each IP is limited to a maximum of 5 requests per minute. If the limit is exceeded, the following error message will be returned:

- **Status Code**: 429 Too Many Requests
- **Response:**

```json
{
  "message": "Too many requests from this IP, please try again after a minute"
}
```
