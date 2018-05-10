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
         <p v-if="error_message" class="register_error">{{error_message}}</p>
         <button class="secondary" @click.stop.prevent="cancelRegistration">Avbryt</button>
      </form>
   </div>
</template>

<script>
import Vue from "vue";
import AuthService from "../../services/AuthService";
import EventHub from "../../services/EventHub";
import { create } from "vue-modal-dialogs";
import RegisterConfirmation from "../RegisterConfirmation/RegisterConfirmation.vue";
const confirmRegiter = create(RegisterConfirmation);

export default {
  data() {
    return {
      error_message: null,
      default_creds: {
        name: "",
        username: "",
        password: "",
        confirm_password: ""
      },
      register_creds: Vue.util.extend({}, this.default_creds)
    };
  },
  methods: {
    register() {
      if (
        this.register_creds.password === this.register_creds.confirm_password
      ) {
        AuthService.register(this.register_creds).then(
          () => {
            confirmRegiter().then(() => {
              this.$store.dispatch("showRegister", false);
            });
          },
          err => {
            this.error_message =
              "Något gick fel, användarnamnet kan vara upptaget";
          }
        );
      }
    },
    cancelRegistration() {
      this.$store.dispatch("showRegister", false);
      this.register_creds = this.default_creds;
    }
  }
};
</script>
