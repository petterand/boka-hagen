<template>
<div>
  <button 
      @click="saveBookedDates"
      v-if="$store.state.selectedDates.length > 0">
      Boka valda datum
   </button>
  <span 
      class="fa fa-bars" 
      id="top-menu-button" 
      @click.stop="toggleMenu">
   </span>
</div>
</template>

<script>
export default {
  methods: {
    saveBookedDates() {
      this.$store.dispatch("bookDates");
    },
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    }
  }
};
</script>
