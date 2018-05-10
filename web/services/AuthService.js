import Vue from 'vue';

const AuthService = {
   authenticate,
   isAuthenticated,
   logout,
   register
}

export default AuthService;


function authenticate(creds) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/login', creds).then((response) => {
         if (response.body.status === 'loggedin') {
            resolve(response.body.user);
         } else {
            reject();
         }
      }, (err) => {
         reject();
      })
   })
}

function logout(creds) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/signout', creds).then((response) => {
         resolve(response.body);
      }, (err) => {
         reject();
      })
   })
}

function isAuthenticated() {
   return new Promise((resolve, reject) => {
      Vue.http.get('/api/isAuthenticated').then((response) => {
         resolve(response.body);
      });
   })
}

function register(register_creds) {
   console.log(register_creds);
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/user/', register_creds).then(response => {
         resolve(response.body);
      }, err => {
         reject(err);
      })
   })
}