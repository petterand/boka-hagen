<template>
  <div id="index-wrapper">
    <top-menu id="top-menu"></top-menu> 
    <div id="left-wrapper">
      <calendar id="calendar-wrapper" />
    </div>
    <div id="right-wrapper" v-bind:class="{'open':$store.state.menuOpen}">
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
import TopMenu from "../components/TopMenu/TopMenu.vue";

export default {
  mounted() {
    this.$store.dispatch("fetchIsAuthenticated");
    this.$store.dispatch("getBookings");
    const _onFirstTouch = onFirstTouch.bind(this);
    function onFirstTouch(e) {
      this.$store.dispatch("screenTouched");
      window.removeEventListener("touchstart", _onFirstTouch, false);
    }
    window.addEventListener("touchstart", _onFirstTouch, false);
    document.querySelector("body").addEventListener(
      "click",
      function(e) {
        const rightWrapper = document.querySelector("#right-wrapper");
        if (!rightWrapper.contains(e.target) && this.$store.state.menuOpen) {
          this.$store.dispatch("toggleMenu");
        }
      }.bind(this)
    );
  },
  components: {
    Calendar,
    UserInfo,
    Login,
    RegisterUser,
    TopMenu
  }
};
</script>

