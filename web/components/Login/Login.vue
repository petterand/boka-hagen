<template>
   <div>
      <form @submit.prevent="signin">
         <label for="username">Användarnamn</label>
         <input type="text" name="username" v-model="creds.username">
         <label for="password">Lösenord</label>
         <input type="password" name="password" v-model="creds.password">
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
      }
    };
  },
  methods: {
    signin() {
      this.$store.dispatch("login", this.creds).then(() => {});
    },
    showRegister() {
      this.$store.dispatch("showRegister", true);
    }
  }
};
</script>
