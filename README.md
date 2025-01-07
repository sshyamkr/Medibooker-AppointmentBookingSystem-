# MediBooker - Doctor Appointment Management System

MediBooker is a comprehensive web-based platform designed to simplify and enhance the process of booking and managing doctor appointments. Built using the MERN stack (MongoDB, Express, React, Node.js), the system ensures a seamless experience for both patients and healthcare providers.

---

## Features

### Patient Features
- **User-Friendly Interface**: Easy navigation and smooth appointment booking process.
- **Appointment Scheduling**: Book appointments with doctors at preferred time slots.
- **Role-Based Access Control**: Secure user authentication with JWT.

### Doctor Features
- **Appointment Management**: View and manage daily appointments.
- **Limited Slot Availability**: Restrict appointments to 4 patients per time slot for better time management.

### Admin Features
- **Dashboard**: View and manage users, doctors, and appointments.
- **Data Security**: Ensure secure access and storage of user data.

---

## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **Redux**: For state management.

### Backend
- **Node.js**: For the server-side application.
- **Express.js**: For API handling.

### Database
- **MongoDB**: For storing application data.

### Authentication & Security
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Role-Based Access Control**: Ensure authorized access.

---

## Installation

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB setup on your local machine or access to a MongoDB Atlas instance.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medibooker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd medibooker
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   npm install
   cd client
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     PORT=5000
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser at `http://localhost:3000`.

---

## Project Structure
```
medibooker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
├── .env
├── package.json
└── README.md
```

---

## Usage
- Patients can register, log in, and book appointments.
- Doctors can view their appointments for the day and manage schedules.
- Admins can oversee the system and manage users and doctors.

---

## Future Enhancements
- Implement payment gateway for online consultation fees.
- Add multi-language support.
- Enhance appointment reminder notifications.
- Integrate telemedicine features for online consultations.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contributors
- **Shyam Kumar** - MCA Student, Chandigarh University ([LinkedIn Profile](#))
- **Somi Kumari** - MCA Student, Chandigarh University ([LinkedIn Profile](#))

---

## Acknowledgements
- Thanks to all mentors and peers who supported this project.
- Special thanks to OpenAI for providing AI-based assistance.

