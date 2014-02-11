define(function(require) {

    "use strict";

    var $ = require('jquery'),
            Backbone = require('backbone'),
            PageSlider = require('app/utils/pageslider'),
            CheckInView = require('app/views/CheckIn'),
            slider = new PageSlider($('body')),
            checkInView = new CheckInView();

    return Backbone.Router.extend({
        routes: {
            "": "checkIn",
            "home":"home",
            "track/:id": "trackDetails",
            "tracks/:id/similiars": "similiars",
            "player/:value": "player"
        },
        checkIn: function(){
            checkInView.delegateEvents();
            slider.slidePage(checkInView.$el);
        },
        home: function() {
            require(["app/views/Home"], function(HomeView) {
                var homeView = new HomeView();
                homeView.delegateEvents();
                slider.slidePage(homeView.$el);
            });
        },
        trackDetails: function(id) {
            require(["app/models/track", "app/views/Track"], function(models, TrackView) {
                var track = new models.Track({id: id});
                /*employee.set({
                 firstName: "Marco",
                 lastName: "Aurelio"
                 });
                 employee.save({},{
                 success: function(response) {   
                 console.log(response.attributes.message);
                 if (response.attributes.message)*/
                track.fetch({
                    success: function(data) {
                        slider.slidePage(new TrackView({model: data}).$el);
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
                /* }
                 });*/

            });
        },
        similiars: function(id) {
            require(["app/models/track", "app/views/Similiars"], function(models, SimiliarsView) {
                var track = new models.Track({id: id});
                track.fetch({
                    success: function(data) {
                        slider.slidePage(new SimiliarsView({model: data}).$el);
                    }
                });
            });
        },
        player: function(value) {
            require(["app/views/Player"], function(PlayerView) {
                slider.slidePage(new PlayerView({value:value}).$el);

            });
        }
    });

});