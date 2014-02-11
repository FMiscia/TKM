require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        iscroll: 'iscroll'
    },

    map: {
        '*': {
            'app/models/track': 'app/models/slim-rest/track'
        }
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'scroll':{
            deps: ['jquery','iscroll']
        },
        'dispatcher':{
            deps: ['jquery'],
            exports: 'D'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
});