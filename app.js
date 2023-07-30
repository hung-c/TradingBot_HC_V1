const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const BinanceAPI = require('./index.js');
const app = express(); 
const router = express.Router();

// Setup public folder 
app.use(express.static(path.join(__dirname, '/')), router);

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

router.get("/", (req, res) => 
{
  res.sendFile(__dirname + "/public/index.html");
});

// Route to get the latest prices in JSON format
router.get('/prices/:numPrices/since/:since?/currency/:currency?', async (req, res) => 
{
    try 
    {
      let currency = req.params.currency || 'BTC/USDT';
      let since = req.params.since || undefined ;
      const numberOfPrices = req.params.numPrices;
      const prices = await binanceAPI.getClosedPrices(currency, numberOfPrices, since);
      res.json(prices);
    } catch (err) 
    {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the prices.'});
    }
});

router.get('/balance', async (req, res) => {
  try {
    const total = await binanceAPI.printBalance();
    res.json(total);
  } catch (err) 
  {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the total balance.'});
  }
});