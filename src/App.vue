<template>
  <div id="app">
    <vue-calendar :type="type" :event-list="activityList"></vue-calendar>

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
      activityList: {}
    }
  },
  methods: {
    getActivityList(){
      const _this = this;
      axios.get('http://web.tycho/api/activity/calendar').then(res=>{
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
