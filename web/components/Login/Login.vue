<template>
   <div>
      <form @submit.prevent="signin">
         <label for="username">Användarnamn</label>
         <input type="text" name="username" v-model="creds.username" @keydown="onKeyDown">
         <label for="password">Lösenord</label>
         <input type="password" name="password" v-model="creds.password" @keydown="onKeyDown">
         <p class="login_error" v-if="!loginSuccess">Felaktigt användarnamn eller lösenord</p>
         <input type="submit" value="Logga in">
      </form>
      <p>
        <a href="" @click.prevent="showRegister">Registrera dig</a>
      </p>
   </div>
</template>

<script>
export default {
  data() {
    return {
      creds: {
        username: "",
        password: ""
      },
      loginSuccess: true
    };
  },
  methods: {
    signin() {
      if (this.creds.username && this.creds.password) {
        this.$store.dispatch("login", this.creds).then(
          () => {},
          err => {
            this.loginSuccess = false;
          }
        );
      } else {
        this.loginSuccess = false;
      }
    },
    showRegister() {
      this.$store.dispatch("showRegister", true);
    },
    onKeyDown() {
      this.loginSuccess = true;
    }
  }
};
</script>
