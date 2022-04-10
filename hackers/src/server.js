const { Server, Origins } = require('boardgame.io/server');
const { SuperTicTacToe }  = require('./Game');

const server = Server({
    games: [SuperTicTacToe],
    origins: [Origins.LOCALHOST, "*", "http://192.168.2.160:3000"]
});

server.run(8080)