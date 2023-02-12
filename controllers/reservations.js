const Reservations = require("../models/reservations");

const getNights = ({arrivalDate, departureDate}) => {
    let nights = 0;
    if(arrivalDate, departureDate){
        nights = (new Date(departureDate) - new Date(arrivalDate))/(24*60*60*1000);
    }
    return nights;
};

module.exports = {
    createReservation: async (req, res, next) => {
        const newReservation = new Reservations({
            ...req.body, status: 'active',
            arrivalDate: new Date(req.body.arrivalDate),
            departureDate: new Date(req.body.departureDate)
        });
        await newReservation.save();
        res.status(200).json({ message: "Successfully Created Reservation" });
    },

    getReservations: async (req, res, next) => {
        Reservations.find({}, (err, data) => {
            if (err)
                res.status(500).json({
                    message: "Sorry something went wrong! please try later...",
                    error: err,
                });
            else res.json(data);
        });
    },

    getReservationDetails: async (req, res, next) => {
        Reservations.findById(req.params.id)
            .exec((err, data) => {
                if (err)
                    res.status(500).json({
                        message: "Sorry something went wrong! please try later...",
                        error: err,
                    });
                else res.json(data);
            });
    },

    cancelReservaton: async (req, res, next) => {
        Reservations.findOneAndUpdate({ _id: req.params.id }, {
            status: 'cancelled'
        }, (err, data) => {
            if (err)
                res.status(500).json({
                    message: "Sorry something went wrong! please try later...",
                    error: err,
                });
            else res.json({ message: "Successfully cancelled reservation." });
        });
    },



    getGuestStaySummary: async (req, res, next) => {
        Reservations.find({ guestId: req.params.guestId }).exec((err, data) => {
            if (err)
                res.status(500).json({
                    message: "Sorry something went wrong! please try later...",
                    error: err,
                });
            else {
                console.log("DATA:::",data)
                const defaultStay = {
                    count: 0,
                    totalNights: 0,
                    stayAmount: 0
                }
                const upcomingStay = {...defaultStay};
                const pastStay = {...defaultStay};
                data.forEach(item => {
                    if(new Date(item.arrivalDate) > new Date()){
                        upcomingStay.count = (upcomingStay.count || 0) + 1;
                        upcomingStay.totalNights = (upcomingStay.totalNights || 0) + getNights(item);
                        upcomingStay.stayAmount = (upcomingStay.stayAmount || 0) + (item.baseStayAmount + item.taxAmount)
                    }else{
                        pastStay.count = (pastStay.count || 0) + 1;
                        pastStay.totalNights = (pastStay.totalNights || 0) + getNights(item);
                        pastStay.stayAmount = (pastStay.stayAmount || 0) + (item.baseStayAmount + item.taxAmount)
                    }
                })
                res.json({
                    upcomingStay,
                    pastStay,
                    cancelledStay: {
                        count: data.filter(o => o.status === 'cancelled').length
                    },
                    totalStayAmount : upcomingStay.stayAmount + pastStay.stayAmount
                })
            }
        });
    },

    searchReservations: async (req, res, next) => {
        const { startDate, endDate } = req.query;
        Reservations.find({
            arrivalDate: {
                $gte: new Date(startDate).toISOString(),
                $lte: new Date(endDate).toISOString()
            }
        }, (err, data) => {
            if (err)
                res.status(500).json({
                    message: "Sorry something went wrong! please try later...",
                    error: err,
                });
            else res.json(data);
        });
    },
};
