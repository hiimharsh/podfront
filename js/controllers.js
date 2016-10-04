angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ngSanitize'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $http) {
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  var container = angular.element(document.querySelector('.container'));
  console.log(container);

  $scope.doUpload = function() {


    document.getElementById('pod-upload').click()
      // document.getElementById('pod-upload')

      // console.log('file is ', $scope.myFile);

    // $scope.$apply(function(scope) {
         // var photofile = element.files[0];
         // var reader = new FileReader();
         // reader.onload = function(e) {
         //    // handle onload
         // };
         // reader.readAsDataURL(photofile);

     // });

    // var uploadUrl = "/fileUpload";
    // NavigationService.uploadFile(file, function(data) {



    // })

  };

  $scope.fileUploaded = function () {

    console.log("file uploaded: ", document.getElementById('pod-upload').files[0])
    // var fileReader = FileReader()
    // console.log("file read to: ", fileReader.result)

  }

  $scope.pods = [];
  $scope.readContent = function($fileContent){

    console.log("file: ", $fileContent)
    // $scope.podResults = $fileContent.split('pod ')
    var lines = $fileContent.split('\n')
    // console.log("results: ", $scope.podResults)
    var re = /pod/ ;
    var hashRe = /#/ ;

    lines = lines.filter (function (item) {
      return re.test(item) && !hashRe.test(item);
    })
    // console.log("results: ", $scope.podResults)


    var versions = [] ;
    var branchRe = /:branch/;
    var cleanRe = /['",]/g ;

    for (var i = 0; i < lines.length; i++) {
      console.log (lines[i]);
      var items = lines[i].split(' ');
      var pods = {};

      items[3] = items[3].replace(cleanRe, '') ;
      pods["item"] = items[3];


      if (items[5] != undefined) {
        pods["version"] = items[5];
      }
      else {
        pods["version"] = "";
      }

      if (branchRe.test(lines)) {
        pods["branch"] = items[9];
      }

      versions.push(pods);
    }

  // console.log (pods) ;
  $scope.pods = versions;
  console.log ($scope.pods);

  var githubApi = "";
  for (var i = 0; i < $scope.pods.length; i++) {
    githubApi = "http://search.cocoapods.org/api/v1/pods.picky.hash.json?query=name:"+ $scope.pods[i].item+"&amount=1&start-at=0";
    console.log("githubApi: ", githubApi)
    NavigationService.getGitHubDetails(githubApi, function(data) {
      console.log("data: ", data);
    });
  }
  };


  // $scope.upload = function(files) {
  //   if (files !== null) {
  //     var file = files[0];
  //     container.addClass('.block');
  //     if (file.name == "PodFile") {
  //       console.log("cool");
  //     } else {
  //       console.log("please upload PodFile");
  //     }
  //   }
  // };


  $scope.podResults = [];

  // for (var i = 0; i < $scope.pods.length; i++) {
  //   var podname = $scope.pods[i];
  //   console.log(podname);
  //   if (podupload.$valid) {
  //     $http.get('http://search.cocoapods.org/api/v1/pods.picky.hash.json?query=' + podname)
  //       .success(function(data) {
  //         $scope.podResults.concat(data);
  //         console.log(data);
  //       })
  //       .error(function(data) {
  //         console.log('Error: ' + data);
  //       });
  //   }
  // }

  //console.log($scope.podResults);

})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

;
