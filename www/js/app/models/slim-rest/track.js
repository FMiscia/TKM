define(function(require) {

    "use strict";

    var $ = require('jquery'),
            Backbone = require('backbone'),
            
    Track = Backbone.Model.extend({
        urlRoot: "http://blackbox-rest.gopagoda.com/app-rest/tracks",
        //urlRoot: "/blackbox-rest/app-rest/tracks",
        
    initialize: function() {
            this.similiars = new TrackCollection();
            this.similiars.url = this.urlRoot + "/" + this.id + "/similiars";
            //this.urlRoot = +"/"+this.attributes.id;
        }

    }),
    
    TrackCollection = Backbone.Collection.extend({
        model: Track,
        //url: "/blackbox-rest/app-rest/tracks"
        url: "http://blackbox-rest.gopagoda.com/app-rest/tracks"
    });

    return {
        Track: Track,
        TrackCollection: TrackCollection
    };

});

