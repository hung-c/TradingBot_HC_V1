const fs = require('fs');

class WriteJSONFile {
  constructor(input) {
    this.input = input;
    this.data = JSON.parse(input);
  }

  writeJSONFile() {
    const jsonString = JSON.stringify(this.data, null, 2);
    const fileName = "data.json";
    fs.writeFileSync(fileName, jsonString);
  }
  writeJSONFile2() {
    const jsonString = JSON.stringify(this.data, null, 2);
    const fileName = "data.json";
    fs.appendFileSync(fileName, jsonString);
  }

  readJSONFile() {
    const values = [];
    for (const item of this.data) {
      values.push({
        timestamp: item.timestamp,
        close: item.close,
      });
    }
    return values;
  }
}

const input1 = `[
  {
      "timestamp": 1690751460000,
      "close": 29220.99
  },
  {
      "timestamp": 1690751520000,
      "close": 29220.99
  },
  {
      "timestamp": 1690751580000,
      "close": 29219.67
  },
  {
      "timestamp": 1690751640000,
      "close": 29219.66
  },
  {
      "timestamp": 1690751700000,
      "close": 29219.66
  }
]`;

const input2 = `[
  {
      "timestamp": 1690751760000,
      "close": 29217.6
  },
  {
      "timestamp": 1690751820000,
      "close": 29217.6
  },
  {
      "timestamp": 1690751880000,
      "close": 29214.12
  },
  {
      "timestamp": 1690751940000,
      "close": 29206.8
  },
  {
      "timestamp": 1690752000000,
      "close": 29206.01
  }
]`;

const writeJSONFile1 = new WriteJSONFile(input1);
writeJSONFile1.writeJSONFile();

const writeJSONFile2 = new WriteJSONFile(input2);
writeJSONFile2.writeJSONFile2();


