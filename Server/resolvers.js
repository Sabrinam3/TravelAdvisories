const dbRtns = require("./dbroutines");
const { alertCollection, advisoryCollection } = require("./config");
const setupAlerts = require("./setupalerts");
const resolvers = {
  setupalerts: async () => {
    return await setupAlerts.setupAlerts();
  },
  alerts: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, alertCollection, {}, {});
  },
  alertsforregion: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(
      db,
      alertCollection,
      { region: args.region },
      { name: 1, text: 1, date: 1 }
    );
  },
  alertsforsubregion: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(
      db,
      alertCollection,
      {
        subregion: args.subregion
      },
      {}
    );
  },
  alertsfortraveller: async args => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(
      db,
      advisoryCollection,
      { travellerName: args.travellerName },
      { name: 1, text: 1, date: 1 }
    );
  },
  regions: async () => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.findAll(db, alertCollection, {}, { region: 1 });
    return new Set(results.map(item => item.region));
  },
  subregions: async () => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.findAll(
      db,
      alertCollection,
      {},
      { subregion: 1 }
    );
    return new Set(results.map(item => item.subregion));
  },
  countries: async () => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.findAll(db, alertCollection, {}, {});
    return results.map(alert => alert.name);
  },
  travellers: async () => {
    let db = await dbRtns.loadDB();
    let results = await dbRtns.findAll(
      db,
      advisoryCollection,
      {},
      { travellerName: 1 }
    );
    return new Set(results.map(traveller => traveller.travellerName));
  },
  postadvisory: async args => {
    let db = await dbRtns.loadDB();
    //Find the travel alert for the corresponding country to get the advisory text
    let alert = await dbRtns.findOne(
      db,
      alertCollection,
      { name: args.country },
      { text: 1 }
    );
    let advisory = {
      travellerName: args.travellerName,
      name: args.country,
      date: args.date,
      text: alert.text ? alert.text : ""
    };
    let results = await dbRtns.addOne(db, advisoryCollection, advisory);
    return results.insertedCount === 1
      ? { advisory, ...{ id: advisory._id } }
      : null;
  }
};
module.exports = { resolvers };
