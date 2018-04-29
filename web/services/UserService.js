import Vue from 'vue';

export default {
   getUsers,
   deleteUser
}



function getUsers() {
   return new Promise((resolve, reject) => {
      Vue.http.get('/api/user/').then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      });
   });
}

function deleteUser(username) {
   return new Promise((resolve, reject) => {
      Vue.http.delete(`/api/user/${username}`).then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      });
   });
}