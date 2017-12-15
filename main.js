var app = new Vue({
  el: '#app',
  data:{
    works_data:[]
  },
  methods:{
    getData: function () {
      var self = this;
      axios.get('https://taosang1992.github.io/works/data_json/works.json')
        .then(function (response) {
          // console.log(response.data);
          self.works_data = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getComponents: function () {
      var self = this;
      self.works_data = self.works_data.filter(function (item) {
        return item.type === "work";
      })
    },
    getProjects: function () {
     var self = this;
     self.works_data = self.works_data.filter(function (item) {
       return item.type === "project";
     })
    }
  },
  created: function () {
    var self = this;
    self.getData();
    self.getComponents();
  }
});