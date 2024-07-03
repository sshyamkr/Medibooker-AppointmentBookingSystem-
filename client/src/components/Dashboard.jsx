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

const Dashboard = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchAppointments());
      if (user.role === "patient") {
        fetchDoctors();
      }
    }
  }, [dispatch, user]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "https://docbook-5g4m.onrender.com/api/doctors"
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    dispatch(createAppointment({ doctorId, date, time })).then(() => {
      setDate("");
      setTime("");
      setDoctorId("");
    });
    navigate("/");
    toast.success("Appointment Booked");
  };

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
    toast.success("Appointment Removed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Welcome {user && user.role && user.username}
        </h2>

        {user.role === "patient" && (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold">Book Your Appointment</h3>
              <form className="mt-4 space-y-4" onSubmit={handleBooking}>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-[#28da40] border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Book
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Your Appointments</h3>
              {loading ? (
                <p className="mt-4 text-gray-600">Loading...</p>
              ) : error ? (
                <p className="mt-4 text-red-600">{error.message}</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {appointments
                    .filter(
                      (appointment) => appointment.patient._id === user.id
                    )
                    .map((appointment) => (
                      <div
                        key={appointment._id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md"
                      >
                        <p className="text-lg font-medium">
                          {new Date(appointment.date).toLocaleDateString()} -{" "}
                          {appointment.time}
                        </p>
                        <p className="text-sm text-gray-700">
                          with Dr. {appointment.doctor.username}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {user.role === "doctor" && (
          <div>
            <h3 className="text-xl font-semibold">Your Appointments</h3>
            {loading ? (
              <p className="mt-4 text-gray-600">Loading...</p>
            ) : error ? (
              <p className="mt-4 text-red-600">{error.message}</p>
            ) : (
              <div className="mt-4 space-y-4">
                {appointments
                  .filter((appointment) => appointment.doctor._id === user.id)
                  .map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-4 bg-gray-100 rounded-lg shadow-md"
                    >
                      <p className="text-lg font-medium">
                        {new Date(appointment.date).toLocaleDateString()} -{" "}
                        {appointment.time}
                      </p>
                      <p className="text-sm text-gray-700">
                        with patient {appointment.patient.username}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {user.role === "admin" && (
          <div>
            <h3 className="text-xl font-semibold">All Appointments</h3>
            {loading ? (
              <p className="mt-4 text-gray-600">Loading...</p>
            ) : error ? (
              <p className="mt-4 text-red-600">{error.message}</p>
            ) : (
              <div className="mt-4 space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-4 bg-gray-100 rounded-lg shadow-md"
                  >
                    <p className="text-lg font-medium">
                      {new Date(appointment.date).toLocaleDateString()} -{" "}
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-700">
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
