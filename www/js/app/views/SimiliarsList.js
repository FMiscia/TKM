define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/SimiliarsList.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {   
            this.$el
                    .html(template({tracks: this.collection.toJSON()}));
            return this;
        },
                
        events: {
            
        }
                

        
        
        

    });

});