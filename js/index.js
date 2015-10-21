// Check if streaming
var getStreamInfo = function(stream){

  var url = 'https://api.twitch.tv/kraken/';
  var obj = {};
$.getJSON(url + 'streams/' + stream).success(function(data) {
  var streaming = (data.stream === null) ? false : true;
  if (streaming) {
    obj.status = 'online';
    var streamTitle = data.stream.channel.status;

    if (streamTitle.length > 36) {
      streamTitle = streamTitle.substring(0,33);
      streamTitle += '...';
    }
    obj.streamTitle = streamTitle;
  } else {
    obj.status = 'offline';
    data.streamTitle = '';
  }
  obj.username = stream;

  // Get user name and image
  $.getJSON(url + 'users/' + stream).success(function(data) {
    obj.name = data.display_name;
    obj.logo = data.logo;




  });
});
console.log(obj);
return obj;
}

$(document).ready(function() {

  var myViewModel = function() {
    var self = this; //set the value for this

     self.streamers = ko.observableArray(["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"]);
     self.streamerObjects = ko.observableArray([]);

    for(i = 0; i < self.streamers().length; i ++){
    self.streamerObjects.push(getStreamInfo(self.streamers()[i]));
  }
    console.log(self.streamerObjects());
}

  ko.applyBindings(myViewModel, document.getElementById("twitch")); //apply bindings

});
