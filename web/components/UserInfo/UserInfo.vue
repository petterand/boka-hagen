<template>
<div>
   <div id="userInfo">
      <div id="imageAndUsername">
         <img src="../../assets/avatar.png">
         <p>
            <span>
               <span>{{fullname}}</span>
               <span class="fas fa-pencil-alt userInfo_edit-button" @click="openEditUser"></span>
               <span v-if="$store.getters.isAdmin" class="fas fa-hand-spock userInfo_edit-button" @click="openAdminView"></span>
            </span>
            <span class="signout"><a href="" @click.prevent="signout">Logga ut</a></span>
         </p>

      </div>
      <div id="bookedDates" v-if="userBookedDates.length > 0">
         <p>Dina kommande bokningar</p>
         <table>
            <tr v-for="(date, index) in userBookedDates" v-bind:key="index">
               <td>{{date.from}} - {{date.to}}</td><td class="delete-booking fa fa-trash" @click="deleteBooking(date)"></td>
            </tr>
         </table>
      </div>
      <div id="selectedDatesWrapper" v-if="selectedDates.length > 0">
         <p>Dina valda datum:</p>
         <table>
            <tr v-for="(dates, index) in selectedDates" v-bind:key="index">
               <td>{{`${dates.from} - ${dates.to}`}}</td>
            </tr>
         </table>
         <button @click="bookSelectedDates">Boka valda datum</button>
      </div>
   </div>
</div>
</template>

<script>
import Utils from "../../services/Utils";
import moment from "moment";
import { create } from "vue-modal-dialogs";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation.vue";
import AdminView from "../AdminView/AdminView.vue";
import EditUser from "../EditUser/EditUser.vue";

const confirmDelete = create(DeleteConfirmation, "data");
const adminView = create(AdminView);
const editUser = create(EditUser, "user");

export default {
  methods: {
    signout() {
      this.$store.dispatch("logout");
    },
    bookSelectedDates() {
      this.$store.dispatch("bookDates");
    },
    openAdminView() {
      adminView();
    },
    openEditUser() {
      editUser(this.$store.state.user);
    },
    deleteBooking(booking) {
      const data = {
        question: "Är du säker på att du vill ta bort bokningen?",
        details: `${booking.from} - ${booking.to}`
      };
      confirmDelete(data).then(result => {
        if (result === true) {
          this.$store.dispatch("deleteBooking", booking.keyId);
        }
      });
    }
  },
  computed: {
    selectedDates() {
      return Utils.getDateRanges(this.$store.state.selectedDates);
    },
    userBookedDates() {
      return this.$store.state.bookings
        .filter(booking => booking.user.username === this.username)
        .filter(booking => moment(booking.from).isSameOrAfter(moment()));
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
