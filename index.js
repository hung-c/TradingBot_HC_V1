const ccxt = require('ccxt');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

//Connect to binance
const binance = new ccxt.binance({
    apiKey: process.env.KEY,
    secret: process.env.SEC
    // need your apikey and secret key from your binance account to connect to market
});
binance.setSandboxMode(true); //connect to demo test web

//Print your balance
async function printBalance() {
    const balance = await binance.fetchBalance(); 
    console.log(balance);
}

async function main() {
    
    //Get Price of BTC
    const price = await binance.fetchOHLCV ('BTC/USDT', '1m',undefined, 5)
    const bPrices = price.map(price => {
        return {
            timestamp: moment(price[0]).format(),
            open: price[1],
            high: price[2],
            low: price[3],
            close: price[4],
            volume: price[5]
        }
    } )
    console.log(bPrices);
    const average5Prices = bPrices.reduce((acc,price) => acc + price.close, 0)/5 
    const lastPrice =bPrices[bPrices.length-1].close;


    console.log(bPrices.map(p => p.close),average5Prices, lastPrice);
}

printBalance()