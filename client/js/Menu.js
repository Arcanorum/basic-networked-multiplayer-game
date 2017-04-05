
FunkyMultiplayerGame.Menu = function () {
};

FunkyMultiplayerGame.Menu.prototype = {

    create: function () {
        // This button will cause the 'join_game' event to be emitted.
        this.add.button(150, 80, 'btn-join-game', this.joinGamePressed, this);
    },

    joinGamePressed: function () {
        socket.emit('join_game');
    }
};