import Vue from 'vue';

export default {
   getUsers,
   deleteUser,
   updateUser,
   updatePassword
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

function updateUser(user) {
   return new Promise((resolve, reject) => {
      Vue.http.put(`/api/user/${user.username}`, user).then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      })
   });
}

function updatePassword(user) {
   return new Promise((resolve, reject) => {
      Vue.http.put(`/api/user/${user.username}`, user).then(response => {
         resolve();
      }, err => {
         reject(err);
      })
   });
}