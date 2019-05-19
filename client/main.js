let socket;
let transactionID = 0;
const bookOfMonsters = {};
const transactions = {};
//adds unique transaction to the local list
createTransaction = (monsterName) => {
    const currentTransactionID = transactionID;
    transactions[currentTransactionID] = monsterName;
    transactionID++;
    return currentTransactionID;
}
//processes server response of whether the transaction was succesful
processTransaction = (transaction,accepted,tokens) => {
    if(accepted){
        const monster = transactions[transaction];
        const monsterCost = parseInt(bookOfMonsters[monster].cost);
        const newTokenValue = parseInt(tokens.text()) - monsterCost;
        tokens.text(newTokenValue);
        delete transactions[transaction];
    }else{
        delete transactions[transaction];
    }
}

buttonClicked = (e, monster) => {
    var transaction = createTransaction(monster);
    socket.emit('buyMonster',monster,transaction);
}

bindSocketEvents = (shopUL,tokens) => {
    socket.on('startingInfo',(book,hero)=>{
        console.log("book:",book);
        console.log("hero:",hero);
        const monsterNames = Object.keys(book);
        for(const monster of monsterNames){
            bookOfMonsters[monster] = book[monster];
        }
        tokens.text(hero.tokens);
        buildShop(shopUL);
    });

    socket.on('transaction', (transaction,accepted)=>{
        processTransaction(transaction,accepted,tokens);
    });

    socket.on('tokens', (tokenCount)=>{
        tokens.text(tokenCount);
    });
}

requestStartingInfo = () => {
    socket.emit('requestStartingInfo');
}

buildShop = (shopUL,tokens) => {
    const monsterNames = Object.keys(bookOfMonsters);
    for(const monster of monsterNames){
        //make list item
        const li = $('<li/>').attr({
            "id" : monster+'-li'
        }).appendTo(shopUL);
        //make buy button
        $('<button/>').attr({
            "id" : monster+'-buy-button',
            "monster" : monster,
        }).text("Buy")
        .click((e)=>{buttonClicked(e,monster);})
        .appendTo(li);
        //define monster constants and stats string
        const monsterCost = bookOfMonsters[monster].cost;
        const monsterHP = bookOfMonsters[monster].hp;
        const monsterSpeed = bookOfMonsters[monster].speed;
        const statsString = monster.toUpperCase() + ' |  Cost: '+monsterCost+' tokens  |  HP: '+monsterHP+'  |  Speed: '+monsterSpeed;
        //add stats string to list item
        const span = $('<span/>').attr({
            id: monster+'-stats-span',
            class: 'monsterStats'
        }).text(statsString).appendTo(li);
        
    }
}


main = () => {
    //set up socket
    socket = io();
    //find dom elements
    const tokens = $('#tokens');
    const shopUL = $('#shop');
    //bind click event
    $("#getToken").click((e)=>{socket.emit('getToken');});
    bindSocketEvents(shopUL,tokens);
    requestStartingInfo();
}

$.ready(main());