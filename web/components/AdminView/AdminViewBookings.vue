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
            <span class="fas fa-times admin-delete"></span>
         </td>
      </tr>
   </table>
</template>

<script>
export default {};
</script>
