<template>
<div>
   <div id="userInfo">
      <div id="imageAndUsername">
         <img src="../../assets/avatar.png">
         <p>
            <span>{{fullname}}</span>
            <span class="signout"><a href="" @click.prevent="signout">Logga ut</a></span>
         </p>

      </div>
      <div id="selectedDatesWrapper" v-if="selectedDates.length > 0">
         <p>Dina valda datum:</p>
         <p v-for="(dates, index) in selectedDates" v-bind:key="index">{{dates.from}} - {{dates.to}}</p>
         <button @click="bookSelectedDates">Boka valda datum</button>
      </div>
      <div id="bookedDates" v-if="userBookedDates.length > 0">
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
    },
    bookSelectedDates() {
      this.$store.dispatch("bookDates", this.selectedDates);
    }
  },
  computed: {
    selectedDates() {
      return Utils.getDateRanges(this.$store.state.selectedDates);
    },
    userBookedDates() {
      return this.$store.state.bookings
        .filter(booking => booking.user.username === this.username)
        .map(booking => {
          return `${booking.from} - ${booking.to}`;
        });
    },
    username() {
      return this.$store.state.user.username;
    },
    fullname() {
      return this.$store.state.user.name;
    }
  }
};
</script>
