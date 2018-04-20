const mongoose = require('mongoose');
const Hashids = require('hashids');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
   to: { type: String, required: true },
   from: { type: String, required: true },
   user: {
      "name": { type: String, required: true },
      "username": { type: String, required: true }
   },
   keyId: { type: String, required: true }
});

bookingSchema.pre('validate', function (next) {
   if (!this.keyId) {
      const rand = Math.floor(Math.random() * Math.floor(10000))
      this.keyId = new Hashids('bookings').encode((new Date().getTime()) + rand);
   }
   next();
});

const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;