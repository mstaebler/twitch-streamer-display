

$(document).ready(function() {

    var myViewModel = function() {
        var self = this; //set the value for this

        self.streamers = ko.observableArray(["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"]);
        self.streamerObjects = ko.observableArray([{name:"testing"}]);

        // Check if streaming
        var getStreamInfo = function(stream){

            var url = 'https://api.twitch.tv/kraken/';
            var obj = {};
            $.getJSON(url + 'streams/' + stream)
                .success(function(data) {
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

                        //  console.log(obj);
                        self.streamerObjects.push(obj);
                    });

            });

        };

        //dont put a random for loop in your view model, wrap it in a function with a name that describes it's behavior
        //also use var for your iterator i
        for(i = 0; i < self.streamers().length; i ++){
            getStreamInfo(self.streamers()[i]);
        }
        // console.log(self.streamerObjects);
        self.streamerObjects.push({name:"test"});
        };


        ko.applyBindings(myViewModel, document.getElementById("twitch")); //apply bindings

});
