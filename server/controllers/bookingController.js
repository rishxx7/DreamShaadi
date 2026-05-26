const Booking = require("../models/Booking");


// CREATE BOOKING
const createBooking = async (req, res) => {

  try {

    const booking = await Booking.create(
      req.body
    );

    res.status(201).json({
      message: "Booking successful",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// GET USER BOOKINGS
const getUserBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.params.userId,
    }).populate("vendor");

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createBooking,
  getUserBookings,
};