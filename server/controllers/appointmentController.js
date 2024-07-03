const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

const createAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor" });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    let appointments;
    if (req.user.role === "admin") {
      appointments = await Appointment.find()
        .populate("patient")
        .populate("doctor");
    } else if (req.user.role === "doctor") {
      appointments = await Appointment.find({ doctor: req.user._id })
        .populate("patient", "username")
        .populate("doctor", "username");
    } else {
      appointments = await Appointment.find({ patient: req.user._id })
        .populate("patient", "username")
        .populate("doctor", "username");
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Appointment removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getAppointments, deleteAppointment };
