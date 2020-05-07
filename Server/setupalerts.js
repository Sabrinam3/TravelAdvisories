const { gocAlerts, isoCountries, alertCollection } = require("./config");
const routines = require("./utilities");
const dbRtns = require("./dbroutines");
const setupAlerts = async () => {
  try {
    //String to hold results of operations
    var results = "";
    //Establish connection
    db = await dbRtns.loadDB();

    //Delete existing documents from the alerts collection
    let deleteResults = await dbRtns.deleteAll(db, alertCollection);
    results += `Deleted ${deleteResults.deletedCount} documents from ${alertCollection} collection.`;

    //Obtain country data from the web
    let countries = await routines.getJSONFROMWWWPromise(isoCountries);
    if (countries) results += "Retrieved Country JSON from remote web site.";
    //Obtain alert data from the web
    let alerts = await routines.getJSONFROMWWWPromise(gocAlerts);
    if (alerts) results += "Retrieved Alert JSON from remote web site.";

    if (countries && alerts) {
      //For each country, look up corresponding alert json. Create objects with properties from both country and alert.
      await Promise.allSettled(
        countries.map(async country => {
          //check if alert exists for country
          let alertPresent = alerts.data[country["alpha-2"]] !== undefined;
          //Add the document to collection
          await dbRtns.addOne(db, alertCollection, {
            country: country["alpha-2"],
            name: country.name,
            text: alertPresent
              ? alerts.data[country["alpha-2"]].eng["advisory-text"]
              : "No travel alerts",
            date: alertPresent
              ? alerts.data[country["alpha-2"]]["date-published"].date
              : "",
            region: country.region,
            subregion: country["sub-region"]
          });
        })
      );

      //Query the collection to see how many alert documents were added
      let allDbAlerts = await dbRtns.findAll(
        db,
        alertCollection.toString(),
        {},
        {}
      );
      results += `Added approximately ${allDbAlerts.length} new documents to the ${alertCollection} collection.`;
    }
  } catch (err) {
    results = err;
  } finally {
    return results;
  }
};

module.exports = { setupAlerts };
