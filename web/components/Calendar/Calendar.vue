<template>
   <div>
      <div id="calendar">
         <div id="calendarHeader">
            <div class="monthNavigationButton prev fa fa-chevron-left" v-on:click="gotoPreviousMonth"></div>
            <div class="monthName">{{monthName}}</div>
            <div class="monthNavigationButton next fa fa-chevron-right" v-on:click="gotoNextMonth"></div>
         </div>
         <div id="monthWrapper">
            <div v-for="(day,index) in numberOfDaysInMonth" :data-date="getDate(day)" v-bind:key="index" class="dayRow" @mousedown="down" @mousemove="move" @mouseup="up">
               <span class="dayNumber">{{day}}</span> <span class="dayName" v-bind:class="{'sunday': isSunday(day)}">{{dayName(day)}}</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    moment.locale("sv");
  },
  mounted() {},
  data() {
    return {
      mouseIsDown: false,
      selectedDates: []
    };
  },
  methods: {
    gotoPreviousMonth() {
      this.$store.dispatch("changeMonth", -1);
    },
    gotoNextMonth() {
      this.$store.dispatch("changeMonth", 1);
    },
    getDate(day) {
      const date = new Date(this.$store.state.currentDate).setDate(day);
      return moment(date).format("YYYY-MM-DD");
    },
    dayName(day) {
      const date = new Date(this.$store.state.currentDate).setDate(day);
      return moment(date).format("dddd");
    },
    isSunday(day) {
      const date = new Date(this.$store.state.currentDate).setDate(day);
      return moment(date).day() === 0;
    },

    move(e) {
      if (this.mouseIsDown) {
        const date = e.target.dataset.date;
        if (!e.target.classList.contains("selected")) {
          e.target.classList.add("selected");
        }
      }
    },
    down() {
      this.mouseIsDown = true;
    },
    up() {
      this.mouseIsDown = false;
    }
  },
  computed: {
    currentMonth() {
      return new Date(this.$store.state.currentDate).getMonth();
    },
    monthName() {
      return moment(this.$store.state.currentDate).format("MMMM");
    },
    numberOfDaysInMonth() {
      return moment(this.$store.state.currentDate).daysInMonth();
    }
  }
};
</script>

