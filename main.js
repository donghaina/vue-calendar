var app = new Vue({
  el: '#app',
  data:{
    msg: 'Hello world'
  },
  methods:{

  },
  created: function () {
    axios.get('')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});