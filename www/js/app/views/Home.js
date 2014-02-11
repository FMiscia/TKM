define(function(require) {

    "use strict";
    var $ = require('jquery'),
            _ = require('underscore'),
            Backbone = require('backbone'),
            TrackListView = require('app/views/TrackList'),
            models = require('app/models/track'),
            tpl = require('text!tpl/Home.html'),
            template = _.template(tpl),
            myself = new Object();

    return Backbone.View.extend({
        initialize: function() {
            this.trackList = new models.TrackCollection();
            var key = "";
            myself = this;
            this.render();
        },
        render: function() {
            myself.$el.html();
            myself.$el.html(template());
            myself.$el.find("#homediv").addClass("loadingicon");
            this.trackList.fetch({reset: false, success: function(data) {
                    myself.$el.find("#homediv").removeClass("loadingicon");
                    myself.listView = new TrackListView({collection: data, el: $("#wrapper", myself.el)});
                },
                error: function(model, xhr, options) {
                    console.log(xhr.toString());

                }});
            return this;
        },
        events: {
            'click .tlist': 'switchTo',
        },
        switchTo: function(event) {
            var id = $($(event.target).parent()).attr('id');
            Backbone.history.navigate("track/" + id, {trigger: true});
        }

    });
});