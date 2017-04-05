
FunkyMultiplayerGame.Game = function () {
};

FunkyMultiplayerGame.Game.prototype = {

    create: function () {
        // Create an external reference to this function context so we can access this game state from the socket callbacks.
        _this = this;

        // Create an object to hold references to the player sprites.
        this.playerSprites = {};

        this.add.text(120, 20, "Use Up/Down/Left/Right\nkeys to move.", {
            font: "40px Arial",
            fill: '#ffffff',
            align: 'center'
        });
    },
    
    update: function () {
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            socket.emit('move_player', {axis: 'x', force: -1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            socket.emit('move_player', {axis: 'x', force: 1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
            socket.emit('move_player', {axis: 'y', force: -1});
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            socket.emit('move_player', {axis: 'y', force: 1});
        }
    }
};