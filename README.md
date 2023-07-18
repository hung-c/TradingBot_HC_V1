# Trading Bot HC V1

## Introduction

Trading Bot HC V1 is a simple trading bot that allows you to automate your cryptocurrency trading using the Binance API. This README file provides instructions on how to set up and use the trading bot.

## Prerequisites
Before getting started, ensure that you have the following prerequisites:

* Node.js (version 12 or higher)
* npm (Node Package Manager)
* Binance API credentials (API Key and Secret Key)
* Basic knowledge of JavaScript and trading concepts

## Installation
1. Clone the repository:

```
git clone https://github.com/hung-c/TradingBot_HC_V1.git
```
2. Navigate to the project directory:
```
cd TradingBot_HC_V1
```
3. Install the required dependencies:
```
npm install
```
## Configuration

1. Rename the .env.example file to .env:

```
cp .env.example .env
```

2. Open the .env file and enter your Binance API credentials:
```
API_KEY=YOUR_API_KEY
API_SECRET=YOUR_API_SECRET
```
> Make sure to replace YOUR_API_KEY and YOUR_API_SECRET with your actual API key and secret key provided by Binance.

3. Modify the config.js file:
Open the config.js file in a text editor and adjust the configuration settings according to your preferences. This file allows you to define parameters such as the trading pair, order type, quantity, and more.

4. Save the changes and close the file..

## Usage
To start the trading bot, run the following command in the project directory:

```
node index.js
```

The bot will start monitoring the market and execute trades based on the configured parameters.

## Monitoring and Debugging
The bot will log its actions and any errors encountered during execution. You can monitor the bot's output in the console.

If you encounter any issues, refer to the error messages and logs for troubleshooting. Additionally, you can modify the code or configuration files as needed to customize the bot's behavior.

## Disclaimer

Trading cryptocurrencies involves risks, and the bot's performance does not guarantee profits.
Use the trading bot at your own risk and do thorough testing before deploying it with real funds.
The author and contributors of this project are not responsible for any financial losses or damages incurred.

## Contributing

Contributions to the Trading Bot HC V1 project are welcome! If you find any bugs or have suggestions for improvements, please open an issue on the GitHub repository.

To contribute code changes:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make the necessary modifications.
4. Commit your changes and push them to your forked repository.
5. Submit a pull request on the original repository.
6. Please follow the project's code style and ensure that your changes are well-tested.

## License
This project is licensed under the MIT License.
