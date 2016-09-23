angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ngSanitize'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  var container = angular.element(document.querySelector('.container'));
  console.log(container);

  $scope.doUpload = function() {
    $("#pod-upload").click();
  };
  $scope.upload = function(files) {
    if (files !== null) {
      var file = files[0];
      container.addClass('.block');
      if (file.name == "PodFile") {
        console.log("cool");
      } else {
        console.log("please upload PodFile");
      }
    }
  };

  $scope.pods = [];
  $scope.podResults = [];

  for (var i = 0; i < $scope.pods.length; i++) {
    var podname = $scope.pods[i];
    console.log(podname);
    if (podupload.$valid) {
      $http.get('http://search.cocoapods.org/api/v1/pods.picky.hash.json?query=' + podname)
        .success(function(data) {
          $scope.podResults.concat(data);
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
  }

  //console.log($scope.podResults);

})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
