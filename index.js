const ccxt = require('ccxt');
const moment = require('moment');
const delay = require('delay');
const dotenv = require('dotenv').config();

class BinanceAPI {
    constructor(key, secret)
    {
        this.key = key;
        this.secret = secret;
        this.connectBinance(key, secret)
    }
    
    connectBinance(key, secret)
    {
        this.binance = new ccxt.binance({
            // Need your apikey and secret key from your binance account to connect to market
            apiKey: key,
            secret: secret
            
        });
        if (this.binance.certified)
        {
            console.log("Good Connect!!!")
        }
        this.binance.setSandboxMode(true); //connect to demo test web
        return this.binance
    }

    async printBalance(btcPrice){
        const balance = await this.binance.fetchBalance(); 
        const total = balance.total
        return total
    }
    
    async getFullPrices(currency= 'BTC/USDT', numberOfPrices = 1, since = undefined) {
        const price = await this.binance.fetchOHLCV (currency, '30s', since, numberOfPrices)
        const bPrices = price.map(price => {
            return {
                timestamp: moment(price[0]).toLocaleString(),
                open: price[1],
                high: price[2],
                low: price[3],
                close: price[4],
                volume: price[5]
            }
        });
        return bPrices;
    }
    async getClosedPrices(currency, numberOfPrices, since) {
        const maxRetries = 3;
        let retryCount = 0;
        while (retryCount < maxRetries) {
            try {
                const price = await this.binance.fetchOHLCV(currency, '1m', since, numberOfPrices);
                const bPrices = price.map(price => {
                    return {
                        timestamp: price[0],
                        close: price[4]
                    };
                });
                return bPrices;
            } catch (error) {
                console.error(`Attempt ${retryCount + 1} failed with error:`, error);
                this.connectBinance(this.key, this.secret)
                retryCount++;
            }
        }
    }

    async tick() {

        //Get Price of BTC
        console.log(' ');
        const price = await this.binance.fetchOHLCV ('BTC/USDT', '1m',undefined, 5)
        const bPrices = price.map(price => {
            return {
                timestamp: moment(price[0]).toLocaleString(),
                open: price[1],
                high: price[2],
                low: price[3],
                close: price[4],
                volume: price[5]
            }
        } )
   
        console.log(bPrices);
        const averagePrices = bPrices.reduce((acc,price) => acc + price.close, 0)/5 
        const lastPrice =bPrices[bPrices.length-1].close
        console.log(bPrices.map(p => p.close),averagePrices, lastPrice);
        console.log(`Average price: ${averagePrices}. Last Price: ${lastPrice}`);
   
        //Algorithm to make decision 
        let direction = ''
        if (lastPrice > averagePrices)
        {
            direction = 'sell';
        }
        else {
            direction = 'buy';
        }
    
        const TRADE_SIZE = 100;
        const quantity = TRADE_SIZE / lastPrice
        
        //const order = await binance.createOrder('BTC/USDT', direction, 'limit', quantity)
        const order = await this.binance.createMarketOrder('BTC/USDT', direction, quantity);
        console.log(`${moment().toLocaleString()}: ${direction} ${quantity} BTC at ${lastPrice}`)
        //console.log(order);
        this.printBalance(lastPrice);
   }
}

module.exports = BinanceAPI;
// async function main() {
//     while(true) {
//         Binace1 = new BinanceAPI(process.env.KEY, process.env.SECRET)
//         prices =  await Binace1.getClosedPrices('BTC/USDT', 10);
//         console.log(prices);
//         await delay(60 * 1000);
//     }
// }

//printBalance()
//main()