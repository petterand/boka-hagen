<template>
   <table id="admin-view_users-table">
      <tr>
         <th>Namn</th><th>Användarnamn</th>
      </tr>
      <tr v-for="user in users" v-bind:key="user.username">
         <td>{{user.name}}</td>
         <td>{{user.username}}</td>
         <td>
            <span class="fas fa-pencil-alt admin-edit" @click="openEditUser(user)"></span>
            <span class="fas fa-times admin-delete"></span>
         </td>
      </tr>
   </table>
</template>

<script>
import UserService from "../../services/UserService";
import EditUser from "../EditUser/EditUser.vue";
import { create } from "vue-modal-dialogs";
const editUser = create(EditUser, "user");
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    UserService.getUsers().then(users => {
      this.users = users;
    });
  },
  methods: {
    openEditUser(user) {
      editUser(user);
    }
  }
};
</script>
