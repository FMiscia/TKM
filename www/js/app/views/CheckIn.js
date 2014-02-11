define(function(require) {

    "use strict";
    var $ = require('jquery'),
            _ = require('underscore'),
            Backbone = require('backbone'),
            D = require('dispatcher'),
            tpl = require('text!tpl/CheckIn.html'),
            template = _.template(tpl),
            myself = new Object();

    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html();
            this.$el.html(template());
            $("#nfcResult").html("");
            $("#nfcResult").removeClass("loadingicon");
            myself = this;
            this.addNFCListeners();

            return this;
        },
        addNFCListeners: function(){
            nfc.addNdefListener (
                myself.onNdef, 
                function () { // success callback
                    console.log("Waiting for NDEF tag");
                },
                function (error) { // error callback
                    alert("Error adding NDEF listener " + JSON.stringify(error));
                }
            );
            if (device.platform == "Android") {

                // Android reads non-NDEF tag. BlackBerry and Windows don't.
                nfc.addTagDiscoveredListener(
                    myself.onNfc,
                    function() {
                        console.log("Listening for non-NDEF tags.");
                    },
                    function (error) { // error callback
                        alert("Error adding NDEF listener " + JSON.stringify(error));
                    }
                );

                nfc.addMimeTypeListener(
                    'text/pg',
                    myself.onNdef,
                    function() {
                        console.log("Listening for NDEF mime tags with type text/pg.");
                    },
                    function (error) { // error callback
                        alert("Error adding NDEF listener " + JSON.stringify(error));
                    }
                );

            }
        },
        onNdef: function(nfcEvent){
            $("#nfcResult").addClass("loadingicon");
            var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;
            var params = nfc.bytesToString(ndefMessage[0].payload).substring(3).split("-");
            D.post(
                "/locate",
                { 
                "name": params[0], 
                "code": params[1], 
                "dailycode": params[2] 
                },
                function(data) {
                        console.log(data);
                        var response = $.parseJSON(data);
                        if(response.result){
                            $("#nfcResult").removeClass("loadingicon");
                            $("#nfcResult").html("Checked In");                 
                            myself.switchTo();
                        }else{
                            $("#nfcResult").removeClass("loadingicon");
                            $("#nfcResult").html("Check in failed. Try with another tag");
                        }
                });
            $("#nfcWrapper").removeClass("loadingicon");
            $("#nfcResult").html("");
        },

        onNfc: function(nfcEvent){
            var tag = nfcEvent.tag;
            //alert((JSON.stringify(nfcEvent.tag)));
            $("#nfcWrapper").removeClass("loadingicon");
            myself.switchTo();
        },
        switchTo: function(event) {
            Backbone.history.navigate("home", {trigger: true});
        }

    });
});