const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const reservationSchema = new Schema(
  {
    guestId: String,
    guestName: String,
    hotelName: String,
    arrivalDate: Schema.Types.Date,
    departureDate: Schema.Types.Date,
    status: String,
    baseStayAmount: Number,
    taxAmount: Number
  },
  {
    timestamps: true,
  }
);

// Create a model
const Reservation = mongoose.model("reservations", reservationSchema, "reservations");

// Export the model
module.exports = Reservation;
