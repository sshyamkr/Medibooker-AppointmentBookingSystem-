const express = require("express");
const {
  createAppointment,
  getAppointments,
  deleteAppointment,
  getAvailableSlots} = require("../controllers/appointmentController");
const { protect, admin } = require("../middlewares/auth");
const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.delete("/:id", protect, admin, deleteAppointment);


// Add route for available slots
router.get("/available", getAvailableSlots);

module.exports = router;
