# Leaderboard Application

This is a leaderboard application built using React, designed to manage and display a list of users. The application allows you to add, update, delete users, and sort or filter them based on name and points. This application also shows the top 3 users section. It features a responsive UI and pagination for better usability.

## Features

- Add new users with their details.
- Update user points dynamically.
- Delete users from the leaderboard.
- Sort users alphabetically by name or by points.
- Search and filter users by name.
- Pagination for easier navigation through the user list.
- View user details on click.

## Technologies Used

- React (Frontend framework)
- Tailwind CSS/motion (Styling)
- Node.js/Express (Backend API)
- MongoDB/Mongoose (Database)

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/unmey08/leaderboard-app.git
   cd leaderboard-app
   ```

2. Install dependencies for frontend and backend:

   ```bash
   npm run build
   ```

3. Start the application (production):

   ```bash
   npm run start
   ```

4. Start the application (development):

   ```bash
   npm run dev
   ```

5. Open the application in your browser at:

   ```
   http://localhost:3200
   ```

### API Endpoints

#### `GET /users`

Fetch all users.

#### `POST /users`

Add a new user. Request body:

```json
{
  "name": "John Doe",
  "age": 30,
  "address": "123 Main St"
}
```

#### `PATCH /users/:id`

Update user points. Request body:

```json
{
  "delta": 10
}
```

#### `DELETE /users/:id`

Delete a user.

#### `POST /users/reset`

Reset points of all users to 0.

## Deployment

This project is live at https://leaderboard-app-mftq.onrender.com/
