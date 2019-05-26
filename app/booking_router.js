const router = require("express").Router();
const Booking = require("./models/Booking");

const isLoggedIn = require("./AuthHelpers").isLoggedIn;

router.get("/", (req, res) => {
   Booking.find({}, null, { sort: "-from" }, (err, bookings) => {
      bookings = bookings.map(booking => {
         return {
            from: booking.from,
            to: booking.to,
            user: booking.user,
            keyId: booking.keyId
         };
      });
      res.status(200).send(bookings);
   });
});

router.post("/", isLoggedIn, (req, res) => {
   const bookings = req.body;
   if (bookings && req.user) {
      const newBookings = bookings.map(booking => {
         const rand = Math.floor(Math.random() * Math.floor(10000));
         return {
            from: booking.from,
            to: booking.to,
            user: {
               name: req.user.name,
               username: req.user.username
            }
         };
      });
      Booking.create(newBookings, (err, bookings) => {
         if (err) {
            return res.status(500).send(err);
         }
         res.status(201).send(bookings);
      });
   } else {
      res.status(500).send();
   }
});

router.delete("/:id", isLoggedIn, (req, res) => {
   const bookingId = req.params.id;
   Booking.deleteOne({ keyId: bookingId }, err => {
      if (err) {
         return res.status(500).send(err);
      }
      res.status(200).send({ deleted: bookingId });
   });
});

router.put("/:id", isLoggedIn, (req, res) => {});

module.exports = router;
