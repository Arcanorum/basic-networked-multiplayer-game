
// Global reference to the active Phaser game state. This makes doing things with
// a state possible without actually being in the state file itself.
var _this;

// Connect to the Socket.io server that is running on the IP address 127.0.0.1 and at port number 3512.
var socket = io("http://127.0.0.1:3512");
// This connects to 127.0.0.1 which is localhost (this computer), which is also where the server is running.
// If the server was running somewhere else, like on a cloud service, then change the IP address to the
// public IP address of that device. If on Windows, open a console and type 'ipconfig' to find the IPv4
// address of a computer.

// Add some event listeners to this socket object.
// When the connection is made, the server can send events to this client, and vice versa.
// Open your browser's console to see the output. Follow along with the instructions there.

socket.on('hello_client', function (data) {
    console.log("");
    console.log("* * * hello_client event received from server.");
    console.log("* Data was also sent:");
    console.log(data);
});

socket.on('how_are_you', function () {
    console.log("");
    console.log("* * * how_are_you event received from server.");
    console.log("* Try sending an event back. You can use the browser console to send events manually.");
    console.log("* Type in `socket.emit('im_fine');` and hit enter.");
});

socket.on('good_to_hear', function () {
    console.log("");
    console.log("* * * good_to_hear event received from server.");
    console.log("* That's good to hear. :)");
    console.log("* Now try sending an event with some data to the server.");
    console.log("* Let's change the username stored on the socket for this client on the server.");
    console.log("* Type in `socket.emit('change_username', {username: 'PUT A NEW USERNAME HERE'});` and hit enter.");
    console.log("* Now check the output in the command line console that the server is running in.");
});

socket.on('join_game_success', function () {
    console.log("");
    console.log("* * * join_game_success event received from server.");
    console.log("* Starting Game state.");
    // This player joined the game. Start the 'Game' state.
    _this.state.start("Game");
});

socket.on('remove_player', function (data) {
    console.log("");
    console.log("* * * remove_player event received from server.");
    // Check that the 'playerSprites' object exists on whatever the context is for '_this'.
    if(_this.playerSprites !== undefined){
        // Check that the player sprite to remove is actually in the list of player sprites.
        if(_this.playerSprites[data]){
            // Destroy the player sprite for the player to remove.
            _this.playerSprites[data].destroy();
            // Delete the property for that player.
            delete _this.playerSprites[data];
        }
    }
});

var updateCount = 0;
socket.on('state_update', function (data) {

    // Uncomment the below code in an editor, save it and restart the client (refresh the page) to see the emitter output.
    /*updateCount += 1;
    console.log("");
    console.log("* * * state_update event received from server. Update count: " + updateCount);*/

    // The server sent the positions of each player with this event. Update the position of each player's sprite.
    // Check that the 'playerSprites' object exists on whatever the context is for '_this'.
    if(_this.playerSprites !== undefined){
        // The 'playerSprites' object exists.
        for(var i= 0, len = data.length; i<len; i+=1){
            // Check that there is a property on the 'playerSprites' with the key that matches this socket ID.
            if(_this.playerSprites[data[i].id]){
                // This player's sprite exists. Update its position.
                _this.playerSprites[data[i].id].x = data[i].x;
                _this.playerSprites[data[i].id].y = data[i].y;
            }
            // No property was found for the player that this socket ID belongs to. Add a sprite for them.
            else {
                _this.playerSprites[data[i].id] = _this.add.sprite(data[i].x, data[i].y, 'red-fly');
            }
        }
    }

});

// Create the game object for the game. This is what the
// Phaser states, and your own game data, are added on to.
FunkyMultiplayerGame = {};

FunkyMultiplayerGame.Boot = function () {
};

FunkyMultiplayerGame.Boot.prototype = {

    create: function () {
        _this = this;

        this.state.start('Preload');
    },

    events: (function () {
        socket.on('disconnect', function () {
            console.log("The server disconnected. ")
        });
    })()
};
