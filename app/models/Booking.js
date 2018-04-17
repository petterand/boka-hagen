const mongoose = require('mongoose');
const Hashids = require('hashids');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
   to: { type: String, required: true },
   from: { type: String, required: true },
   user: { type: String, required: true },
   keyId: { type: String, required: true }
});


const Booking = mongoose.model('Booking', bookingSchema);

bookingSchema.pre('save', function (next) {
   if (!this.keyId) {
      this.keyId = new Hashids(new Date().getTime()).encrypt(this._id);
   }
   next();
});

module.exports = Booking;