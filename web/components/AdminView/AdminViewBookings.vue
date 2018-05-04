<template>
  <table id="admin-view_bookings-table">
      <tr>
         <th>Namn</th><th>Användarnamn</th>
      </tr>
      <tr v-for="booking in $store.state.bookings" v-bind:key="booking.id">
         <td>{{booking.from}} - {{booking.to}}</td>
         <td>{{booking.user.name}}</td>
         <td>
            <span class="fas fa-pencil-alt admin-edit"></span>
            <span class="fas fa-times admin-delete" @click="deleteBooking(booking)"></span>
         </td>
      </tr>
   </table>
</template>

<script>
import { create } from "vue-modal-dialogs";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation.vue";
const confirmDelete = create(DeleteConfirmation, "date");
export default {
  methods: {
    deleteBooking(booking) {
      confirmDelete(booking).then(result => {
        if (result === true) {
          this.$store.dispatch("deleteBooking", booking.keyId);
        }
      });
    }
  }
};
</script>
