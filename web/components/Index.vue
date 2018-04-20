<template>
  <div id="index-wrapper">
    <div id="left-wrapper">
      <calendar id="calendar-wrapper" />
    </div>
    <div id="right-wrapper">
      <user-info v-if="$store.state.isLoggedIn" id="user-info-wrapper" />
      <login v-if="!$store.state.showRegister && !$store.state.isLoggedIn" id="login-wrapper" />
      <register-user v-if="$store.state.showRegister" id="register-wrapper" />
    </div>
  </div>
</template>

<script>
import Calendar from "../components/Calendar/Calendar.vue";
import UserInfo from "../components/UserInfo/UserInfo.vue";
import Login from "../components/Login/Login.vue";
import RegisterUser from "../components/RegisterUser/RegisterUser.vue";

export default {
  mounted() {
    this.$store.dispatch("fetchIsAuthenticated");
    this.$store.dispatch("getBookings");
  },
  components: {
    Calendar,
    UserInfo,
    Login,
    RegisterUser
  }
};
</script>

