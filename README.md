# DocBook

DocBook is a comprehensive appointment booking application that facilitates seamless interaction between doctors, patients, and administrators. Built using the MERN stack and Redux Toolkit for state management, docBook ensures a smooth and efficient workflow for managing appointments and consultations.

![image](https://github.com/isayanpal/docBook/assets/102523492/2da28059-7cbd-44dd-8f9c-5dad8c7306b6)
![image](https://github.com/isayanpal/docBook/assets/102523492/5a901e22-e185-484a-b963-d98106073189)
![image](https://github.com/isayanpal/docBook/assets/102523492/1ed3c1a5-ca34-4d4e-9a34-bf1ef4ea296c)

## Live link - https://docbook-v1.vercel.app/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **Role-Based Login**: Secure and personalized access for Admins, Doctors, and Patients.
- **Appointment Management**: Easy scheduling of appointments.
- **User Profiles**: Comprehensive profiles for doctors and patients.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind css
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel, onRender

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**

   ```sh
   git clone https://github.com/isayanpal/docBook.git
   ```

2. **Navigate to the project directory**

   ```sh
   cd docBook
   ```

3. **Install backend dependencies**

   ```sh
   cd server
   npm install
   ```

4. **Create a `.env` file in the `server` directory and add your environment variables:**

   ```plaintext
   MONGO_URI=your mongo string
   PORT = 5000
   JWT_SECRET = yoursecret
   JWT_EXPIRE=30d
   `

   ```

5. **Install frontend dependencies**

   ```sh
   cd client
   npm install
   ```

## Usage

1. **Start the backend server**

   ```sh
   cd server
   npm run dev
   ```

2. **Start the frontend server**

   ```sh
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173/`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Happy Coding ❤️
