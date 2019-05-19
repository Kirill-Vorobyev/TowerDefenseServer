const Monster = require('./Monster');
const Hero = require('./Hero');
const BookOfMonsters = require('./BookOfMonsters');

module.exports = class Game {

    constructor(){
        const startingTokens = 1000;
        this.hero = new Hero(startingTokens);
        this.book = BookOfMonsters;
        console.log(this.book);
    }

};