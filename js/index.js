var app = angular.module("Streams", []);

app.controller("PostsCtrl", function($scope, $http) {
  // scope variables
  $scope.status = [];
  $scope.streams = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"];
  
  //local variables
  var baseURL = 'https://api.twitch.tv/kraken/streams/';
  var cb = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
  
  // GET JSON data
  $scope.streams.forEach( function(url){
      $.getJSON(baseURL+url+cb).success(function(data, status, headers, config) {
        if(data.stream === null){ //stream is offline
        $scope.status.push(["offline"]);
          $scope.$apply(); //update view
          console.log($scope.status);
        }else { //stream is online
              // push online status
              $scope.status.push(["online",data.stream.channel.url,data.stream.channel.status,"link"]);
              $scope.$apply();//update view      
        }
      });
      
 });
});