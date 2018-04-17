<template>
   <div>
      <form @submit.prevent="register">
         <label for="username">Namn</label>
         <input type="text" name="name" v-model="register_creds.name">
         <label for="username">Användarnamn</label>
         <input type="text" name="username" v-model="register_creds.username">
         <label for="password">Lösenord</label>
         <input type="password" name="password" v-model="register_creds.password">
         <label for="password">Bekräfta ditt lösenord</label>
         <input type="password" name="password" v-model="register_creds.confirm_password">
         <input type="submit" value="Registrera">
      </form>
   </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import EventHub from "../../services/EventHub";
export default {
  data() {
    return {
      register_creds: {
        name: "",
        username: "",
        password: "",
        confirm_password: ""
      }
    };
  },
  methods: {
    register() {
      if (
        this.register_creds.password === this.register_creds.confirm_password
      ) {
        AuthService.register(this.register_creds).then(() => {
          this.$store.dispatch("showRegister", false);
        });
      }
    }
  }
};
</script>
