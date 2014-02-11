define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Employee.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            return this;
        },
        
        events:{
            "click #save_data" : 'save'
        },
        
        save: function(){
            this.model.set('officePhone' ,$('#cellnumber_id').val());
            this.model.set('cellPhone' ,$('#officenumber_id').val());
            this.model.set('email' ,$('#email_id').val());
            this.model.save();
        }

    });

});