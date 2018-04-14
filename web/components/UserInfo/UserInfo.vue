<template>
<div>
   <div id="userInfo">
      <div id="imageAndUsername">
         <img src="../../assets/avatar.png">
         <p>{{username}}</p>
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
      return this.$store.state.user.username;
    }
  }
};
</script>
