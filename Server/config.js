const dotenv = require("dotenv");
dotenv.config(); //goes to environment and loads variables
module.exports = {
  gocAlerts: process.env.ALERTURL,
  isoCountries: process.env.ISOCOUNTRIES,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  alertCollection: process.env.ALERTCOLLECTION,
  countryCollection: process.env.COUNTRYCOLLECTION,
  advisoryCollection: process.env.ADVISORYCOLLECTION,
  port: process.env.PORT,
  server: process.env.SERVER,
  graphql: process.env.GRAPHQLURL
};
