const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const BinanceAPI = require('./index.js');

const app = express(); 

// Setup public folder 
app.use(express.static(path.join(__dirname,'public')));

// Body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//API configs 
const port = 3000;

// Replace these with your actual Binance API key and secret
const apiKey = process.env.KEY;
const apiSecret = process.env.SECRET;

const binanceAPI = new BinanceAPI(apiKey, apiSecret);

//Start server
app.listen(port, () => console.log(`Server started on port ${port}`))

app.get('/', async (req, res) => {
  try {
    const currency = req.query.currency || 'BTC/USD';
    const numberOfPrices = parseInt(req.query.numberOfPrices) || 1;

    const prices = await binanceAPI.getClosedPrices(currency, numberOfPrices);
    res.json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the prices.' });
  }
});

// Route to get the latest prices in JSON format
app.get('/prices/:numPrices', async (req, res) => {
    try {
      const currency = 'BTC/USDT'
      const numberOfPrices = req.params.numPrices
      const prices = await binanceAPI.getClosedPrices(currency, numberOfPrices);
      res.json(prices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the prices.' });
    }
});