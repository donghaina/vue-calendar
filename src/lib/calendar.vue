<template>
  <div class="mywk__calendar" ref="calendarBox">
    <div class="calendar" v-if="type=='month'">
      <div class="calendar__header">
        <div class="header__pre" @click="handlePreMonth"></div>
        <div class="header__title">{{selectedYear}}年{{selectedMonth + 1}}月{{selectedDate}}日</div>
        <div class="header__next" @click="handleNextMonth"></div>
      </div>

      <div class="calendar__main">
        <div class="main__block-head" v-for="(item, index) in calendarHeader" :key="index">{{item}}</div>

        <div
          :class="`main__block ${item.day === selectedDate && 'main__block-today'}`"
          @click.stop="handleDayClick($event,item)"
          @mouseover="showEventList($event,item)"
          v-for="(item, index) in displayDaysPerMonth(selectedYear, selectedMonth)"
          :key="item.type + item.day + `${index}`"
        >{{item.day}}</div>
      </div>
    </div>

    <div class="calendar" v-if="type=='year'">
      <div class="calendar__header">
        <div class="header__pre" @click="handlePreMonth"></div>
        <div class="header__title">{{selectedYear}}年{{selectedMonth + 1}}月{{selectedDate}}日</div>
        <div class="header__next" @click="handleNextMonth"></div>
      </div>

      <div class="calendar__main">
        <div class="main__block-head" v-for="(item, index) in calendarHeader" :key="index">{{item}}</div>

        <div
          :class="`main__block ${(item.type === 'pre' || item.type === 'next') ? 'main__block-not' : ''} ${(item.day === selectedDate && item.type === 'normal') && 'main__block-today'}`"
          @click.stop="handleDayClick($event,item)"
          @mouseover="showEventList($event,item)"
          v-for="(item, index) in displayDaysPerMonthT(selectedYear)[selectedMonth]"
          :key="item.type + item.day + `${index}`"
        >
          <span
            v-if="item.event && item.event.activity_count>0"
            class="enevnt-count"
          >{{item.event.activity_count}}</span>
          {{item.day}}
        </div>
      </div>
    </div>
    <section class="event-wrapper"  :style="{top:offestTop,left:offsetLeft}"  v-if="eventListVisible">
      <ul class="event-list">
        <li v-for="(item,index) in events" :key="index">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "vue-calendar",
  props: {
    eventList: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: "month"
    },
    highlightColor: {
      // 高亮颜色
      type: String,
      default: "#ff0000"
    }
  },
  data() {
    return {
      calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate(),
      eventListVisible: false,
      offestTop: 0,
      offsetLeft: 0,
      events: []
    };
  },
  methods: {
    showEventList(e, item) {
      this.events = this.eventList[item.key]
        ? this.eventList[item.key]["activity_list"]
        : [];
      if (this.events.length > 0) {
        this.offestTop = e.pageY - 20 + "px";
        this.offsetLeft = e.pageX - 360 + "px";
        setTimeout(() => {
          this.eventListVisible = true;
        }, 100);
      } else {
        setTimeout(() => {
          this.eventListVisible = false;
        }, 100);
      }
    },
    hideEventList(e) {
      this.eventListVisible = false;
    },
    displayDaysPerMonth(year, month) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      let targetDay = new Date(year, month, 1).getDay();
      let total_calendar_list = [];
      let preNum = targetDay;
      let nextNum = 0;
      if (targetDay > 0) {
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: "pre",
            day: ""
          };
          total_calendar_list.push(obj);
        }
      }
      for (let i = 0; i < daysInMonth[month]; i++) {
        let obj = {
          type: "normal",
          day: i + 1,
          year: year,
          month: month
        };
        total_calendar_list.push(obj);
      }

      // if (total_calendar_list.length > 35) {
      //   nextNum = 42 - total_calendar_list.length;
      // } else {
      //   nextNum = 35 - total_calendar_list.length;
      // }

      // if (month === 1 && new Date(year, month, 0).getDay() === 6) {
      //   nextNum = 0
      // }

      nextNum = 6 - new Date(year, month + 1, 0).getDay();

      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "next",
          day: ""
        };
        total_calendar_list.push(obj);
      }
      total_calendar_list.forEach(item => {
        let format_day = item.day < 10 ? "0" + String(item.day) : item.day;
        let format_month =
          item.month < 10 ? "0" + String(item.month) : item.month;
        let format_year = item.year < 10 ? "0" + String(item.year) : item.year;
        item.key = format_year + "-" + format_month + "-" + format_day;
      });
      return total_calendar_list;
    },
    displayDaysPerMonthT(year) {
      const _this = this;
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }

      let daysPreMonth = [].concat(daysInMonth);
      daysPreMonth.unshift(daysPreMonth.pop());

      let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
        let day = new Date(year, index, 1).getDay();
        if (day === 0) {
          return 6;
        } else {
          return day - 1;
        }
      });

      let total_calendar_list = new Array(12)
        .fill([])
        .map((month, monthIndex) => {
          let addDays = addDaysFromPreMonth[monthIndex] + 1,
            daysCount = daysInMonth[monthIndex],
            daysCountPre = daysPreMonth[monthIndex],
            monthDate = [];

          if (addDays >= 7) {
            addDays = addDays - 7;
          }

          for (; addDays > 0; addDays--) {
            let obj = {
              day: daysCountPre--,
              type: "pre",
              year: year,
              month: _this.selectedMonth
            };

            monthDate.unshift(obj);
          }

          for (let i = 0; i < daysCount; ) {
            let obj = {
              day: ++i,
              type: "normal",
              year: year,
              month: _this.selectedMonth + 1
            };

            monthDate.push(obj);
          }
          if (monthDate.length > 35) {
            for (let i = 42 - monthDate.length, j = 0; j < i; ) {
              let obj = {
                day: ++j,
                type: "next",
                year: year,
                month: _this.selectedMonth + 2
              };

              monthDate.push(obj);
            }
          } else {
            for (let i = 35 - monthDate.length, j = 0; j < i; ) {
              let obj = {
                day: ++j,
                type: "next",
                year: year,
                month: _this.selectedMonth + 2
              };

              monthDate.push(obj);
            }
          }
          monthDate.forEach(item => {
            let format_day = item.day < 10 ? "0" + String(item.day) : item.day;
            let format_month =
              item.month < 10 ? "0" + String(item.month) : item.month;
            let format_year =
              item.year < 10 ? "0" + String(item.year) : item.year;
            item.key = format_year + "-" + format_month + "-" + format_day;
            item.event = _this.eventList[item.key];
          });
          return monthDate;
        });

      return total_calendar_list;
      // list[key]
    },
    handleDayClick(e, item) {
      if (item.type === "normal") {
        this.selectedDate = Number(item.day);
      }
    },
    handlePreMonth() {
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1;
        this.selectedMonth = 11;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth - 1;
        this.selectedDate = 1;
      }
    },
    handleNextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1;
        this.selectedMonth = 0;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth + 1;
        this.selectedDate = 1;
      }
    }
  },
  mounted() {
    // let _this = this;
    // document.addEventListener("mouseover", function(e) {
    //   if (!_this.$refs.calendarBox.contains(e.target)) {
    //     _this.eventListVisible = false;
    //   }
    // });
  }
};
</script>

<style lang="scss">
$link-color: #448aff;
@function pxWithVw($n) {
  @return 100% * $n / 375;
}

.mywk__calendar {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
}
.event-wrapper {
  padding: 15px;
  background-color: #ffffff;
  position: absolute;
  box-sizing: border-box;
  max-width: 360px;
  width: pxWithVw(300);
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 1000;
}
.event-list {
  color: #409eff;
  margin-left: 15px;
  & > li > a {
    display: block;
    width: 100%;
    color: $link-color;
    text-decoration: none;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.tips {
  margin: 15px 0 0 0;
  text-align: center;
}

.calendar {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: 15px 0;
  border-radius: 4px;
  background-color: white;
  .calendar__header {
    background-color: #f1f1f1;
    color: #2c3135;
    font-size: 16px;
    width: pxWithVw(350);
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 40px;
    height: 40px;
    margin-bottom: 1px;

    .header__title {
      font-size: 16px;
      letter-spacing: 1px;
    }

    .header__pre {
      height: 12px;
      width: 12px;
      margin-left: 20px;
      position: relative;
      cursor: pointer;
      &:after {
        content: " ";
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 2px;
      }
    }

    .header__next {
      height: 12px;
      width: 12px;
      margin-right: 20px;
      cursor: pointer;
      position: relative;
      &:after {
        content: " ";
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 2px;
      }
    }
  }

  .calendar__main {
    width: pxWithVw(350);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .main__block {
      width: pxWithVw(52);
      height: 40px;
      margin-bottom: 1px;
      border-radius: 2px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      background-color: #f1f1f1;
      flex-shrink: 0;
      box-shadow: 0;
      position: relative;
      .enevnt-count {
        position: absolute;
        width: 16px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        top: 1px;
        right: 1px;
        background-color: #f93d3a;
        color: #ffffff;
        text-align: center;
        border-radius: 50%;
        z-index: 100;
      }

      .main__block-piont {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #f93d3a;
        position: absolute;
        left: calc(50% - 2.5px);
        bottom: 0;
      }
    }
    .main__block-not {
      // background-color: #edf2f5;
      // border-radius: 50%;
      color: #7f8fa4;
    }
    .main__block-today {
      transition: 0.5s all;
      background-color: #409eff;
      color: #fff;
      box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
      // border-radius: 50%;
    }
    .main__block-head {
      width: pxWithVw(52);
      height: 40px;
      margin-bottom: 1px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #7f8fa4;
      background-color: #f1f1f1;
      flex-shrink: 0;
    }
  }
}
</style>


