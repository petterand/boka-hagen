import Vue from 'vue';

export default {
   getBookings,
   bookDates,
   deleteBooking
}


function bookDates(dates) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/booking/', dates).then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      });
   });
}

function getBookings() {
   return new Promise((resolve, reject) => {
      Vue.http.get('/api/booking/').then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      });
   });
}

function deleteBooking(id) {
   return new Promise((resolve, reject) => {
      Vue.http.delete(`/api/booking/${id}`).then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      });
   });
}