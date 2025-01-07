const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// Create an appointment
const createAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    // Check if the selected doctor is valid
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor" });
    }

    // Count how many appointments already exist for this doctor, date, and time slot
    const existingAppointments = await Appointment.countDocuments({
      doctor: doctorId,
      date,
      time,
    });

    // Enforce the 4-patient limit per time slot
    if (existingAppointments >= 4) {
      return res
        .status(400)
        .json({ message: "This time slot is fully booked. Please choose another." });
    }

    // Proceed with creating the appointment if under the limit
    const appointment = await Appointment.create({
      patient: req.user.id, // Assuming `req.user.id` contains the patient's ID
      doctor: doctorId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments based on user role
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

// Delete an appointment
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

// Get available slots for a specific doctor on a specific date
const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 1); // Set endDate to the next day

    // Fetch appointments for the given doctor on that date
    const appointments = await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // Group the appointments by time slot and count
    const slotCounts = {};
    appointments.forEach((appointment) => {
      if (slotCounts[appointment.time]) {
        slotCounts[appointment.time]++;
      } else {
        slotCounts[appointment.time] = 1;
      }
    });

    // Generate time slots for the day
    const morningSlots = generateTimeSlots(8, 12);
    const afternoonSlots = generateTimeSlots(14, 18);
    const allSlots = [...morningSlots, ...afternoonSlots];

    // Determine available slots
    const availableSlots = allSlots.filter(
      (slot) => (slotCounts[slot] || 0) < 4 // Check if the slot is under the limit
    );

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to generate time slots
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

module.exports = { createAppointment, getAppointments, deleteAppointment, getAvailableSlots };
