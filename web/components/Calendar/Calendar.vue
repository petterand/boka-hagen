<template>
   <div>
      <div id="calendar">
         <div id="calendarHeader">
            <div class="monthNavigationButton prev fas fa-chevron-left" v-on:click="gotoPreviousMonth"></div>
            <div class="monthName">{{formatCurrentDate("MMMM YYYY")}}</div>
            <div class="monthNavigationButton next fas fa-chevron-right" v-on:click="gotoNextMonth"></div>
         </div>
         <div id="monthWrapper">
            <div v-for="(day,index) in getMonthItems()" 
                  v-bind:key="index"
                  :data-date="day.date" 
                  class="dayRow"
                  v-bind:class="{'booked': day.booking, 'selectable': $store.state.isLoggedIn}"
                  @click="click"
                  @mousedown.stop="down" 
                  @mousemove.stop="move" 
                  @mouseup.stop="up">
               <span class="dayNumber">{{day.dayNumber}}</span> <span class="dayName" v-bind:class="{'sunday': isSunday(day.date)}">{{day.dayName}}</span>
               <span v-if="day.booking" class="booking-info">{{day.booking.user.name}}</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import moment from "moment";
import Utils from "../../services/Utils";

export default {
  created() {
    moment.locale("sv");
  },
  mounted() {
    document.querySelector("body").addEventListener(
      "click",
      function(e) {
        const monthListElem = document.querySelector("#monthWrapper");
        if (!monthListElem.contains(e.target) && !this.$store.state.menuOpen) {
          this.resetSelection();
        }
      }.bind(this)
    );
  },
  data() {
    return {
      mouseIsDown: false,
      selectedDates: []
    };
  },
  methods: {
    formatCurrentDate(format) {
      return moment(this.$store.state.currentDate).format(format);
    },
    gotoPreviousMonth() {
      this.$store.dispatch("changeMonth", -1);
    },
    gotoNextMonth() {
      this.$store.dispatch("changeMonth", 1);
    },
    isSunday(date) {
      return moment(date).day() === 0;
    },
    click(e) {
      const shouldHandleClick =
        this.$store.state.isLoggedIn &&
        this.$store.state.isTouchDevice &&
        !this.$store.state.menuOpen;
      if (shouldHandleClick) {
        if (!e.currentTarget.classList.contains("selected")) {
          e.currentTarget.classList.add("selected");
        } else {
          e.currentTarget.classList.remove("selected");
        }
        this.$store.dispatch("selectDates", this.getSelectedDates());
      }
    },
    move(e) {
      if (this.mouseIsDown) {
        if (!e.currentTarget.classList.contains("selected")) {
          e.currentTarget.classList.add("selected");
        }
      }
    },
    down(e) {
      if (!this.$store.state.isTouchDevice && this.$store.state.isLoggedIn) {
        this.mouseIsDown = true;
        if (!e.currentTarget.classList.contains("selected")) {
          e.currentTarget.classList.add("selected");
        } else {
          e.currentTarget.classList.remove("selected");
        }
      }
    },
    up() {
      if (this.mouseIsDown) {
        this.mouseIsDown = false;
        this.$store.dispatch("selectDates", this.getSelectedDates());
      }
    },
    getSelectedDates() {
      return [...document.querySelectorAll("#calendar .selected:not(.booked)")]
        .map(el => {
          return el.dataset.date;
        })
        .sort();
    },
    resetSelection() {
      this.$store.dispatch("resetSelectedDates");
      [...document.querySelectorAll("#calendar .selected")].forEach(el => {
        el.classList.remove("selected");
      });
    },
    getBooking(day) {
      return this.bookingsInCurrentMonth.find(booking => {
        return booking.date === this.getDate(day);
      });
    },
    getMonthItems() {
      const numberOfDaysInMonth = moment(
        this.$store.state.currentDate
      ).daysInMonth();

      return [...Array(numberOfDaysInMonth).keys()].map(day => {
        const dayNumber = day + 1;
        const date = new Date(this.$store.state.currentDate).setDate(dayNumber);
        const booking = this.bookingsInCurrentMonth.find(booking => {
          return booking.date === moment(date).format("YYYY-MM-DD");
        });

        return {
          dayNumber,
          dayName: moment(date).format("dddd"),
          date: moment(date).format("YYYY-MM-DD"),
          booking
        };
      });
    }
  },
  computed: {
    monthName() {
      return moment(this.$store.state.currentDate).format("MMMM");
    },
    numberOfDaysInMonth() {
      return moment(this.$store.state.currentDate).daysInMonth();
    },
    bookingsInCurrentMonth() {
      let bookingsInMonth = [];
      this.$store.state.bookings
        .filter(booking => {
          const fromDateMonth = moment(booking.from).month();
          const toDateMonth = moment(booking.to).month();
          const currentMonth = moment(this.$store.state.currentDate).month();

          return fromDateMonth === currentMonth && toDateMonth === currentMonth;
        })
        .forEach(booking => {
          const dateRanges = Utils.getDatesInRange(
            booking.from,
            booking.to
          ).map(date => {
            return { date, user: booking.user };
          });
          bookingsInMonth = [...bookingsInMonth, ...dateRanges];
        });

      return bookingsInMonth;
    }
  }
};
</script>

