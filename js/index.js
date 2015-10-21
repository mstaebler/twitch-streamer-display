$(document).ready(function() {

  var myViewModel = function() {
    var self = this; //set the value for this
    self.streamers = ko.observableArray(["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"]);
  }

  ko.applyBindings(myViewModel, document.getElementById("twitch")); //apply bindings

});