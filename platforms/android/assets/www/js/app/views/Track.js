define(function(require) {

    "use strict";

    var $ = require('jquery'),
            _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = require('text!tpl/Track.html'),
            D = require('dispatcher'),
            template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(template(this.model.attributes));
            return this;
        },
        events: {
            "click #vote": 'vote',
            "click #similiars": 'similiars',
            "click #yt": 'listenToYouTube'
        },
        vote: function() {
            $("#votediv").addClass("loadingicon");
            D.get("/tracks/" + this.model.id + "/vote",
            function(result) {
                $("#votediv").removeClass("loadingicon");
                var data = $.parseJSON(result);
                if (data.message) {
                    $("#votemessage").stop(true).hide().text("Successfully voted!")
                            .fadeIn('slow')
                            .delay(1300)
                            .fadeOut('slow');

                }
                else {
                    $("#votemessage").stop(true).hide().text("Too early!")
                            .fadeIn('slow')
                            .delay(1300)
                            .fadeOut('slow');
                }
            });
        },
        similiars: function() {
            $("#similiarsdiv").addClass("loadingicon");
            Backbone.history.navigate("tracks/" + this.model.id + "/similiars", {trigger: true});
        },
        listenToYouTube: function() {
            var url = 'https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=1&category=Music&format=5&orderby=relevance&q=' + this.model.attributes.Title
                    + ' ' + this.model.attributes.authorname + '';
            $("#ytdiv").addClass("loadingicon");
            $.get(url).success(function(response) {
                console.log(response);
                $("#ytdiv").removeClass("loadingicon");
                if (response.data.totalItems != 0)
                    Backbone.history.navigate("player/" + response.data.items[0].id, {trigger: true});
                else {
                    $("#ytmessage").stop(true).hide().text("No Video Found!")
                            .fadeIn('slow')
                            .delay(1300)
                            .fadeOut('slow');                   
                }
                return;
            });
            //var id = "hyZJtN6tl2n";
            //var ref = window.open('http://www.youtube.com/embed/' + id + '?html5=1', '_parent', 'location=yes');
            //var ref = window.open('http://apache.org', '_parent', 'location=yes');
            /*results?search_query='+this.model.attributes.Title
             +' '+this.model.attributes.authorname+'&sm=3?html5=1','_parent');*/

        }


    });

});



