module.exports = class Hero {
    constructor(tokens){
        this.tokens = tokens;
        this.clickRate = 0.2;
    }

    getJSON(){
        return {
            tokens: this.tokens
        }
    }

    buyMonster(Book,monster){
        if(this.tokens >= parseInt(Book[monster].cost)){
            this.tokens -= parseInt(Book[monster].cost);
            return 1;//success
        }else{
            return 0;//insufficient funds
        }
    }

    getTokens(){
        return this.tokens;
    }

    //triggered on button press
    addToken(sendUpdate){
        //reset click rate
        this.clickRate = 0.3;
        //clear any existing loop
        clearTimeout(this.timeout);
        //start loop to generate tokens automatically
        this.timeout = setTimeout(()=>{
            this.autoIncrement(sendUpdate);
        },this.clickRate * 1000);
        //trigger an immediate increment
        this.incrementToken(sendUpdate);
    }
    //recursive call to increment
    autoIncrement(sendUpdate){
        //add to click rate to slow it down
        this.clickRate += 0.02;
        //call itself
        this.timeout = setTimeout(()=>{
            this.autoIncrement(sendUpdate);
        },this.clickRate * 1000);
        //trigger increment
        this.incrementToken(sendUpdate);
    }
    //increment function that pings client an update
    incrementToken(sendUpdate){
        this.tokens++;
        sendUpdate();
    }
}