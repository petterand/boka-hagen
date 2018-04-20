import Vue from 'vue';

export default {
   getBookings,
   bookDates
}


function bookDates(dates) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/booking/', dates).then(response => {
         resolve(response.body);
      }, (err) => {
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