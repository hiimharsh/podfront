var adminURL = "";
if (isproduction) {
  adminURL = "";
} else {
  adminURL = "";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
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
    uploadFile: function(data, request, callback, errCallback) {

      var params = data
      return $http({

        url: adminURL,
        method: "POST",
        data: filter

      }).success(callback).error(errCallback)

    }

  };
});
