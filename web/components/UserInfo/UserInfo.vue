<template>
<div>
   <div id="userInfo">
      <div id="imageAndUsername">
         <img src="../../assets/avatar.png">
         <p>
            <span>{{username}}</span>
            <span><a href="" @click.prevent="signout">Logga ut</a></span>
         </p>

      </div>
      <div id="selectedDatesWrapper" v-if="formattedDates.length > 0">
         <p>Dina valda datum:</p>
         <p v-for="(dates, index) in formattedDates" v-bind:key="index">{{dates}}</p>
         <button>Boka valda datum</button>
      </div>
      <div id="bookedDates">
         <p>Dina bokade datum:</p>
         <p v-for="(dates, index) in userBookedDates" v-bind:key="index">{{dates}}</p>
      </div>
   </div>
</div>
</template>

<script>
import Utils from "../../services/Utils";
export default {
  methods: {
    signout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    formattedDates() {
      return Utils.getDateRanges(this.$store.state.selectedDates);
    },
    userBookedDates() {
      return this.$store.state.bookedDates
        .filter(booking => booking.user === this.username)
        .map(booking => {
          return `${booking.date.from} - ${booking.date.to}`;
        });
    },
    username() {
      return this.$store.state.user.name;
    }
  }
};
</script>
