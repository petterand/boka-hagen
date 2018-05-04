<template>
<div class="modal-dialog">
  <div class="modal-dialog_message-mask" @click="$close(false)"></div>
    <div id="edit-user-dialog" class="modal-dialog_content-wrapper">
       <div class="modal-dialog_close-icon fas fa-times" @click="$close"></div>
      <div class="modal-dialog_content">
        <div class="edit-user-dialog_content">

          <h4>Uppdatara din information</h4>
          <label for="username">Användarnamn</label>
          <input type="text" name="username" v-model="originalUser.username" disabled>
          <label for="name">Namn</label>
          <input type="text" name="name" v-model="user.name">
          <div class="edit-button-result">
             <button @click="updateUser()">Uppdatera</button>
             <p class="request-result success" v-if="userUpdated">Din användare är nu uppdaterad</p>
             <p class="request-result error" v-if="failedUserUpdate">Uppdatering misslyckades</p>
          </div>

          <h4>Uppdatera ditt lösenord</h4>
          <label for="password">Lösenord</label>
          <input type="password" value="password" name="password" disabled>
          <label for="password">Upprepa lösenord</label>
          <input type="password" value="password" name="password" disabled>
          <div class="edit-button-result">
            <button>Uppdatera</button>
            <p class="request-result success" v-if="passwordUpdated">Din användare är nu uppdaterad</p>
            <p class="request-result error" v-if="failedPasswordUpdate">Uppdatering misslyckades</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Userservice from "../../services/UserService";
export default {
  data() {
    return {
      originalUser: this.user,
      userUpdated: false,
      failedUserUpdate: false,
      passwordUpdated: false,
      failedPasswordUpdate: false
    };
  },
  methods: {
    updateUser() {
      const userObj = {
        name: this.user.name,
        username: this.user.username
      };
      if (this.$store.state.user.username === this.originalUser.username) {
        this.$store.dispatch("updateUser", userObj).then(() => {
          this.userUpdated = true;
        });
      } else {
        Userservice.updateUser(userObj).then(() => {
          this.userUpdated = true;
        });
      }
    },
    updatePassword() {}
  }
};
</script>
