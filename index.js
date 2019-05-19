const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 31313;

const server = require('./server/Server.js');
const Game = require('./server/Game');

app.use(express.static(__dirname+'/client'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/client/index.html');
});

http.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

let myGame = new Game();
server.run(io,myGame);