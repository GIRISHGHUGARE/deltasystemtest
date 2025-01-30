# User Management Panel

## Overview
This project is a **User Management Panel** built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**. It allows users to add, display, update, and manage user records asynchronously with a clean and responsive UI. The application includes features such as search, pagination, real-time updates, and confirmation modals.

## Features
- **Add, Update, and Delete Users**
- **Upload Profile Images**
- **Toggle User Status (Active/Inactive)**
- **Search Functionality (Filter users by name or status)**
- **Pagination for User List**
- **Dark/Light Theme Toggle**
- **Responsive Design using Tailwind CSS**

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** React Hooks
- **API Calls:** Axios
- **Notifications:** React Hot Toast

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB (local or cloud-based)

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/deltasystemtest.git
   cd deltasystemtest
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
4. **Run the backend server:**
   ```sh
   npm run server
   ```
5. **Run the frontend:**
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint         | Description              |
|--------|-----------------|--------------------------|
| GET    | /users          | Fetch all users         |
| POST   | /users          | Add a new user          |
| PUT    | /users/:id      | Update user information |
| DELETE | /users/:id      | Delete a user           |

## Screenshots
### User Management Panel
![User Management Panel](screenshot.png)

## Future Enhancements
- Implement role-based authentication
- Improve UI components with animations
- Optimize API performance
- Implement WebSockets for real-time updates

## License
This project is licensed under the MIT License.

