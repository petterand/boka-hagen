<template>
<div class="modal-dialog">
  <div class="modal-dialog_message-mask" @click="$close(false)"></div>
  <div id="admin-view-dialog" class="modal-dialog_content-wrapper">
     <div class="modal-dialog_content">
        <ul id="tab-menu">
           <li @click.stop="tabClick('users')" v-bind:class="{'selected': currentView === 'users'}">Användare</li>
           <li @click.stop="tabClick('bookings')" v-bind:class="{'selected': currentView === 'bookings'}">Bokningar</li>
        </ul>
        <div class="admin-view_content">
           <Users v-if="currentView === 'users'" />
           <Bookings v-if="currentView === 'bookings'" />
        </div>
     </div>
  </div>
</div>
</template>

<script>
import Users from "./AdminViewUsers.vue";
import Bookings from "./AdminViewBookings.vue";
export default {
  data() {
    return {
      currentView: "users"
    };
  },
  methods: {
    tabClick(view) {
      this.currentView = view;
    }
  },
  components: {
    Users,
    Bookings
  }
};
</script>
