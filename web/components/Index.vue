<template>
<div id="index-wrapper">
  <calendar id="calendar-wrapper" />
  <user-info id="user-info-wrapper" />
</div>
</template>

<script>
import Calendar from "../components/Calendar/Calendar.vue";
import UserInfo from "../components/UserInfo/UserInfo.vue";
export default {
  components: {
    Calendar,
    UserInfo
  }
};
</script>

