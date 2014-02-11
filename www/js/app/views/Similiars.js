define(function(require) {

    "use strict";
    var $ = require('jquery'),
            _ = require('underscore'),
            Backbone = require('backbone'),
            SimiliarsListView = require('app/views/SimiliarsList'),
            tpl = require('text!tpl/Similiars.html'),
            template = _.template(tpl),
            myself = new Object();
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(template(this.model.attributes));
            myself = this;
            this.model.similiars.fetch({success: function(results) {
                    new SimiliarsListView({collection: results, el: $("#similiars-wrapper", myself.el)});
                }});
            return this;
        },
        events: {
            'click .tlist': 'switchTo'
        },
        switchTo: function(event) {
            var id = $($(event.target).parent()).attr('id');
            Backbone.history.navigate("track/" + id, {trigger: true});
        }

    });
});