<template>
  <div id="app">
    <vue-calendar :type="type" 
                  :event-list="activityList" 
                  @on-day-click="handleDayClick" 
                   @on-pre-month="handlePreMonth" 
                  @on-next-month="handleNextMonth"></vue-calendar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      type: 'year',
      highlightColor: '#ffcc00',
      selectedYear: new Date().getFullYear(),
      selectedMonth: (new Date().getMonth() + 1 ),
      activityList: {}
    }
  },
  methods: {
    getActivityList(){
      const _this = this;
      axios.get('http://web.tycho/api/activity/calendar',{
        params:{
          year: _this.selectedYear,
          month: _this.selectedMonth,
        }
      }).then(res=>{
        _this.activityList = res.data.data
      })
    },
    pasEnd(val) {
      console.log(val);  //得到密码 可能会进行一些加密动作
      setTimeout(() => { // 模拟请求接口验证密码中 .. 
        if (val === '111111') {
          this.$refs.pay.$payStatus(true) // 传递给子组件
        } else {
          this.$refs.pay.$payStatus(false)
        }
      }, 1000)
    },
    pasEnd1(val) {
      console.log(val);  //得到密码 可能会进行一些加密动作
      setTimeout(() => { // 模拟请求接口验证密码中 .. 
        if (val === '111111') {
          this.$refs.pay1.$payStatus(true)
        } else {
          this.$refs.pay1.$payStatus(false)
        }
      }, 1000)
    },
    handlePreMonth(params){
      this.selectedYear = params.selectedYear;
      this.selectedMonth = params.selectedMonth;
      this.getActivityList();
    },
    handleNextMonth(params){
      this.selectedYear = params.selectedYear;
      this.selectedMonth = params.selectedMonth;
      this.getActivityList();
    },
    handleDayClick(params){
      console.log(params);
    }
  },
  created() {
    this.getActivityList();
  },
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
</style>
