<template>
   <div>
      <div id="calendar">
         <div id="calendarHeader">
            <div class="monthNavigationButton prev fa fa-chevron-left" v-on:click="gotoPreviousMonth"></div>
            <div class="monthName">{{monthName}}</div>
            <div class="monthNavigationButton next fa fa-chevron-right" v-on:click="gotoNextMonth"></div>
         </div>
         <div id="monthWrapper">
            <div v-for="(day,index) in numberOfDaysInMonth" :data-date="getDate(day)" v-bind:key="index" class="dayRow" @mousedown.stop="down" @mousemove.stop="move" @mouseup.stop="up">
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
  mounted() {
    document.querySelector("body").addEventListener("click", e => {
      const monthListElem = document.querySelector("#monthWrapper");
      if (!monthListElem.contains(e.target)) {
        this.resetSelection();
      }
    });
  },
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
    click() {
      return false;
    },
    move(e) {
      if (this.mouseIsDown) {
        //const date = e.target.dataset.date;
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
      this.$store.dispatch("selectDates", this.getSelectedDates());
    },
    getSelectedDates() {
      return [...document.querySelectorAll("#calendar .selected")].map(el => {
        return el.dataset.date;
      });
    },
    resetSelection() {
      this.$store.dispatch("resetSelectedDates");
      [...document.querySelectorAll("#calendar .selected")].forEach(el => {
        el.classList.remove("selected");
      });
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

