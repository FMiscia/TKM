define(function(require) {

    "use strict";

    var $ = require('jquery'),
            _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = require('text!tpl/TrackList.html'),
            iscroll = require('iscroll'),
            template = _.template(tpl),
            mytrackself = new Object();

    return Backbone.View.extend({
        initialize: function() {
            this.render();
            this.collection.on("reset", this.render, this);
        },
        render: function() {
            this.$el
                    .html(template({tracks: this.collection.toJSON()}));
            mytrackself = this;
            this.loadScroll();
            return this;
        },
        events: {
            "touchmove": "prevent"
        },
        prevent: function(event) {
            event.preventDefault();
        },
        loadScroll: function(event) {
            mytrackself.pullDownEl = document.getElementById('pullDown');
            mytrackself.pullDownOffset = mytrackself.pullDownEl.offsetHeight;
            setTimeout(function() {
                mytrackself.loadIscroll();
            }, 200);
        },
        refreshScroll: function() {

        },
        loadIscroll: function() {
            mytrackself.myScroll = new iScroll('wrapper', {
                useTransition: true,
                hideScrollbar: true,
                topOffset: mytrackself.pullDownOffset,
                onRefresh: function() {
                    if (mytrackself.pullDownEl.className.match('loading')) {
                        mytrackself.pullDownEl.className = '';
                        mytrackself.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    }
                },
                onScrollMove: function() {
                    if (this.y > 5 && !mytrackself.pullDownEl.className.match('flip')) {
                        mytrackself.pullDownEl.className = 'flip';
                        mytrackself.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && mytrackself.pullDownEl.className.match('flip')) {
                        mytrackself.pullDownEl.className = '';
                        mytrackself.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                        this.minScrollY = -mytrackself.pullDownOffset;
                    }
                },
                onScrollEnd: function() {
                    if (mytrackself.pullDownEl.className.match('flip')) {
                        mytrackself.pullDownEl.className = 'loading';
                        mytrackself.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                        mytrackself.pullDownAction();
                    }
                }
            });
        },
        pullDownAction: function() {
            mytrackself.collection.fetch({reset: true});
        }
    });
});