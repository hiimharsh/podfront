var adminURL = "";
if (isproduction) {
  adminURL = "";
} else {
  adminURL = "";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Home",
    classis: "active",
    anchor: "home",
    subnav: [{
      name: "Subnav1",
      classis: "active",
      anchor: "home"
    }]
  }];

  return {
    getnav: function() {
      return navigation;
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },
    getGitHubDetails: function(apiUrl, callback) {
      return $http.get(apiUrl).success(callback).error(function (data, status) {
        console.log("Request failed");
      });
    }

  };
});
