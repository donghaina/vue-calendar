import Vue from 'vue'
import App from './App.vue'
import VueCalendar from './lib/index.js'
// import vuePayKeyboard from './lib/indexvue-pay-keyboard'
Vue.use(VueCalendar)
new Vue({
  el: '#app',
  render: h => h(App)
})
