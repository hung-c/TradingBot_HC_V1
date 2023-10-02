const fs = require('fs');
const { Module } = require('module');

class JsonWriter {
    constructor(filename) {
        this.filename = filename;
    }

    write(input) {
      const data = JSON.parse(input);
      try {
          const fileContents =  fs.readFileSync(this.filename);
          if (fileContents.length > 0) {
              const existingData = JSON.parse(fileContents);
              const mergedData = [...existingData, ...data];
              fs.writeFileSync(this.filename, JSON.stringify(mergedData, null, 2));
          }
          else{
            fs.writeFileSync(this.filename, JSON.stringify(data, null, 2));
          }
      } catch (error) {
          if (error.code === 'ENOENT') {
              // File doesn't exist, write new data
              fs.writeFileSync(this.filename, JSON.stringify(data, null, 2));
          } else {
              console.error('An error occurred:', error);
          }
      }
    }
    
    read() {
      try {
          const fileContents = fs.readFileSync(this.filename);
          return JSON.parse(fileContents);
      } catch (error) {
          console.error('An error occurred:', error);
          return null;  // or an empty array [], depending on what you prefer
      }
    }

    clear() {
      try {
          fs.writeFileSync(this.filename, '');
          console.log('File cleared successfully');
      } catch (error) {
          console.error('An error occurred:', error);
      }
    }
}

module.exports = JsonWriter;

// const input1 = `[
//   {
//       "timestamp": 1690751460000,
//       "close": 29220.99
//   },
//   {
//       "timestamp": 1690751520000,
//       "close": 29220.99
//   },
//   {
//       "timestamp": 1690751580000,
//       "close": 29219.67
//   },
//   {
//       "timestamp": 1690751640000,
//       "close": 29219.66
//   },
//   {
//       "timestamp": 1690751700000,
//       "close": 29219.66
//   }
// ]`;

// const input2 = `[
//   {
//       "timestamp": 1690751760000,
//       "close": 29217.6
//   },
//   {
//       "timestamp": 1690751820000,
//       "close": 29217.6
//   },
//   {
//       "timestamp": 1690751880000,
//       "close": 29214.12
//   },
//   {
//       "timestamp": 1690751940000,
//       "close": 29206.8
//   },
//   {
//       "timestamp": 1690752000000,
//       "close": 29206.01
//   }
// ]`;


// const writer = new JsonWriter("data1.json");
// writer.write(input1);
// writer.write(input2)
// let a = writer.read();



