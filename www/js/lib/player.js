(function() {

    var OAUTH2_CLIENT_ID = '362920049428-v32hqqecmfetk9utfjaocomv37d5niu7.apps.googleusercontent.com';
    var OAUTH2_SCOPES = [
        'https://www.googleapis.com/auth/youtube'
    ];

// This callback is invoked by the Google APIs JS client automatically when it is loaded.
    googleApiClientReady = function() {
        gapi.auth.init(function() {
            window.setTimeout(checkAuth, 1);
        });
    }

// Attempt the immediate OAuth 2 client flow as soon as the page is loaded.
// If the currently logged in Google Account has previously authorized OAUTH2_CLIENT_ID, then
// it will succeed with no user intervention. Otherwise, it will fail and the user interface
// to prompt for authorization needs to be displayed.
    function checkAuth() {
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }, handleAuthResult);
    }

// Handles the result of a gapi.auth.authorize() call.
    function handleAuthResult(authResult) {
        if (authResult) {
            // Auth was successful; hide the things related to prompting for auth and show the things
            // that should be visible after auth succeeds.
            //$('.pre-auth').hide();
            loadAPIClientInterfaces();
        } else {
            // Make the #login-link clickable, and attempt a non-immediate OAuth 2 client flow.
            // The current function will be called when that flow is complete.
            /*
             * ERROR TRIGGER
             * $('#login-link').click(function() {
             gapi.auth.authorize({
             client_id: OAUTH2_CLIENT_ID,
             scope: OAUTH2_SCOPES,
             immediate: false
             }, handleAuthResult);
             });*/
        }
    }

// Loads the client interface for the YouTube Analytics and Data APIs.
// This is required before using the Google APIs JS client; more info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
    function loadAPIClientInterfaces() {
        gapi.client.load('youtube', 'v3', function() {
            handleAPILoaded();
        });
    }

    function handleAPILoaded() {
        search("jovanotti questa è la mia casa");
    }

// Search for a given string.
    function search(val) {
        var request = gapi.client.youtube.search.list({
            q: val,
            part: 'snippet'
        });
        request.execute(function(response) {
            console.log(JSON.stringify(response.result));         
        });
    }

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

// 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

    return player;
})