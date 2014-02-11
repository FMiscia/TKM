var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {

    app.receivedEvent('deviceready');
    // Read NDEF formatted NFC Tags
    nfc.addNdefListener (
        app.onNdef, 
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
                app.onNfc,
                function() {
                    console.log("Listening for non-NDEF tags.");
                },
                function (error) { // error callback
                    alert("Error adding NDEF listener " + JSON.stringify(error));
                }
            );

            nfc.addMimeTypeListener(
                'text/pg',
                app.onNdef,
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
        var tag = nfcEvent.tag,
        ndefMessage = tag.ndefMessage;
        alert(JSON.stringify(ndefMessage));
        alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
        },

    onNfc: function(nfcEvent){
        var tag = nfcEvent.tag;
        alert((JSON.stringify(nfcEvent.tag)));
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
}


