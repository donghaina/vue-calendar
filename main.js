var app = new Vue({
  el: '#app',
  data:{
    works_data:[]
  },
  methods:{

  },
  created: function () {
    var self = this;
    axios.get('https://taosang1992.github.io/works/data_json/works.json')
      .then(function (response) {
        // console.log(response.data);
        self.works_data = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});