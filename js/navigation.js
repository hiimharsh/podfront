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
    getCocoapodDetails: function(apiUrl, callback) {

      $http({
          url: apiUrl,
          method: 'GET',
          withCredentials: false
      }).success(callback);

      // return $http.get(apiUrl).success(callback).error(function (data, status) {
      //   console.log(status, " Request failed");
      // });
    },
    getGithubApi: function(githubApi, callback) {

      $http({
          url: githubApi,
          method: 'GET',
          withCredentials: false
      }).success(callback);

      // return $http.get("https://api.github.com/repos/SwiftyJSON/SwiftyJSON/contents/SwiftyJSON.podspec").success(callback).error(function (data, status) {
      //   console.log(status, "Request failed");
      // });
    },
    sendMail: function(fromname, from, text) {
        var method = 'GET';
        var url = "https://api.sendgrid.com/api/mail.send.json?";
        $http({
            method: method,
            url: url + "api_user=" +
                "&api_key=" +
                "&to=" + "midhetfatema94@gmail.com" +
                "&to=" + "harshwohlig@gmail.com" +
                "&subject=ismypodcompatible Feedback" +
                "&text=" + text +
                "&from=" + from +
                "&fromname=" + fromname,
            withCredentials: false
        });
    }
  };
});
