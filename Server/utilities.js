const fsp = require("fs").promises;
const request = require("request");

//Promise based request function using ISOCOUNTRIES to retrieve data from the web
const getJSONFROMWWWPromise = srcAddr => {
  return new Promise((resolve, reject) => {
    request(srcAddr, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(body));
    });
  });
};

module.exports = { getJSONFROMWWWPromise };
