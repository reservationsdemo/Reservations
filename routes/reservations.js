const express = require("express");
const router = require("express-promise-router")();
// const axios = require('axios')
const ReservationController = require("../controllers/reservations");
// SET STORAGE

router.route("/create").post(ReservationController.createReservation);
router.route("/list").get(ReservationController.getReservations);
router.route("/details/:id").get(ReservationController.getReservationDetails);
router.route("/cancel/:id").put(ReservationController.cancelReservaton);
router.route("/guest/stay-summary/:guestId").get(ReservationController.getGuestStaySummary);
router.route("/search").get(ReservationController.searchReservations);
module.exports = router;
