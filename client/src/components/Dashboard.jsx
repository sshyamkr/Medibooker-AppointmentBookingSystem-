import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  createAppointment,
  deleteAppointment,
} from "../features/appointments/appointmentSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadUser } from "../features/auth/authSlice";

const Dashboard = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(loadUser());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user && user.role) {
      dispatch(fetchAppointments());
      if (user.role === "patient") {
        fetchDoctors();
      }
    }
  }, [dispatch, user]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(start, 0, 0, 0);

    while (currentTime.getHours() < end) {
      let slot = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push(slot);
      currentTime.setHours(currentTime.getHours() + 1); // Increment by 1 hour
    }

    return slots;
  };

  const handleDoctorSelection = async (doctorId) => {
    setDoctorId(doctorId);
    if (date) {
      fetchAvailableSlots(doctorId, date);
    }
  };

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    if (doctorId) {
      fetchAvailableSlots(doctorId, selectedDate);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    const morningSlots = generateTimeSlots(8, 12);
    const afternoonSlots = generateTimeSlots(14, 18);
    const allSlots = [...morningSlots, ...afternoonSlots];

    try {
      const response = await axios.get(`${API_BASE_URL}/api/appointments/available`, {
        params: { doctorId, date },
      });

      const available = response.data;
      const filteredSlots = allSlots.filter(slot => !available.includes(slot));
      setAvailableSlots(filteredSlots.length > 0 ? filteredSlots : allSlots); // All available if none booked
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();

    dispatch(createAppointment({ doctorId, date, time })).then(() => {
      setDate("");
      setTime("");
      setDoctorId("");
      toast.success("Appointment Booked");
    });

    navigate("/"); // Navigate back to dashboard
  };

  const handleDelete = (appointmentId) => {
    dispatch(deleteAppointment(appointmentId)).then(() => {
      toast.success("Appointment Deleted");
    });
  };

  if (userLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#080e01" }}
    >
      <div className="w-full max-w-4xl p-8 space-y-8 bg-[#1a1f12] rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center" style={{ color: "#f1fddb" }}>
          Welcome {user.username}
        </h2>

        {/* Appointment Booking Section for Patients */}
        {user.role === "patient" && (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold" style={{ color: "#f1fddb" }}>
                Book Your Appointment
              </h3>
              <form className="mt-4 space-y-4" onSubmit={handleBooking}>
                <select
                  value={doctorId}
                  onChange={(e) => handleDoctorSelection(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] sm:text-sm"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.username}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] sm:text-sm"
                />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] sm:text-sm"
                >
                  <option value="">Select Time Slot</option>
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))
                  ) : (
                    <option disabled>No available slots</option>
                  )}
                </select>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-[#080e01] bg-[#bef96f] border border-transparent rounded-md shadow-sm hover:bg-[#a1e155] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bef96f]"
                >
                  Book
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Display Appointments based on User Role */}
        <div>
          <h3 className="text-xl font-semibold" style={{ color: "#f1fddb" }}>
            Your Appointments
          </h3>
          {loading ? (
            <p className="mt-4" style={{ color: "#f1fddb" }}>
              Loading...
            </p>
          ) : error ? (
            <p className="mt-4 text-red-600">{error.message}</p>
          ) : (
            <div className="mt-4 space-y-4">
              {user.role === "patient" &&
                appointments
                  .filter((appointment) => appointment.patient._id === user._id)
                  .map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-4 bg-[#2b3522] rounded-lg shadow-md"
                    >
                      <p
                        className="text-lg font-medium"
                        style={{ color: "#f1fddb" }}
                      >
                        {new Date(appointment.date).toLocaleDateString()} -{" "}
                        {appointment.time}
                      </p>
                      <p className="text-sm" style={{ color: "#b4c29f" }}>
                        with Dr. {appointment.doctor.username}
                      </p>
                    </div>
                  ))}

              {user.role === "doctor" &&
                appointments
                  .filter((appointment) => appointment.doctor._id === user._id)
                  .map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-4 bg-[#2b3522] rounded-lg shadow-md"
                    >
                      <p
                        className="text-lg font-medium"
                        style={{ color: "#f1fddb" }}
                      >
                        {new Date(appointment.date).toLocaleDateString()} -{" "}
                        {appointment.time}
                      </p>
                      <p className="text-sm" style={{ color: "#b4c29f" }}>
                        with patient {appointment.patient.username}
                      </p>
                    </div>
                  ))}

              {user.role === "admin" &&
                appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-4 bg-[#2b3522] rounded-lg shadow-md"
                  >
                    <p
                      className="text-lg font-medium"
                      style={{ color: "#f1fddb" }}
                    >
                      {new Date(appointment.date).toLocaleDateString()} -{" "}
                      {appointment.time}
                    </p>
                    <p className="text-sm" style={{ color: "#b4c29f" }}>
                      {appointment.patient.username} with Dr.{" "}
                      {appointment.doctor.username}
                    </p>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="px-3 py-1 mt-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
