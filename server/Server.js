exports.run = (io,Game) => {
    io.on('connection',(socket) => {
        console.log('New Connection: ',socket.client.conn.remoteAddress, socket.id);
        socket.on('requestStartingInfo',()=>{
            const book = Game.book;
            const hero = Game.hero.getJSON();
            socket.emit('startingInfo',book,hero);
        });

        socket.on('buyMonster',(monsterName,transaction)=>{
            console.log('buying monster',monsterName,'transaction',transaction);
            const hero = Game.hero;
            const book = Game.book;
            if(hero.buyMonster(book,monsterName)){
                console.log('monster purchased ' + monsterName);
                io.emit('spawnMonster',book[monsterName]);
                socket.emit('transaction',transaction,true);
            }else{
                console.log('insufficient tokens for purchase of '+ monsterName);
                socket.emit('transaction',transaction,false);
            };
        });

        socket.on('getToken',()=>{
            const hero = Game.hero;
            hero.addToken(()=>{socket.emit('tokens',hero.getTokens());});
            console.log("token!");
        });

        socket.on('disconnect', ()=>{
            console.log('Disconnect: ',socket.client.conn.remoteAddress);
        });
    });
}