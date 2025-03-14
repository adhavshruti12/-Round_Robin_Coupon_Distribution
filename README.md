# Coupon System

This project is a Coupon System that allows users to claim coupons and provides an admin panel for managing coupons and viewing claim history. The project consists of a backend built with Node.js and Express, and a frontend built with React.

## Features

- **User Interface**: Users can fill out a form to claim a coupon.
- **Admin Panel**: Admins can log in, add new coupons, manage existing coupons, and view claim history.
- **Round-Robin Distribution**: Coupons are distributed to users in a round-robin manner.
- **IP Cooldown**: Users can only claim a coupon once per minute from the same IP address.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, bcrypt
- **Frontend**: React, Tailwind CSS
- **Other**: CORS, dotenv

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB instance running (local or cloud)

### Installation

1. **Clone the repository**:
 ```sh
   git clone https://github.com/your-username/coupon-system.git
  ```

2.Create a .env file in the backend directory and add your MongoDB URI:
   ```sh
  MONGO_URI=your_mongodb_uri
   ```
3.Start the backend server:
  ```sh
  node server.js
   ```
3.Start the frontend server:
  ```sh
  npm run dev
   ```
## Usage
### User Interface:
Fill out the form to claim a coupon.

### Admin Panel:
- Log in with the admin credentials (default: admin / admin123).
- Add new coupons, manage existing coupons, and view claim history.


## Acknowledgements
- Node.js
- Express
- MongoDB
- React
- Tailwind CSS
