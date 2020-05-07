const { buildSchema } = require("graphql");

const schema = buildSchema(`
 type Query {
 setupalerts: String
 alerts: [Alert],
 alertsforregion(region: String): [Alert],
 alertsforsubregion(subregion: String): [Alert],
 alertsfortraveller(travellerName: String) : [Alert],
 regions: [String],
 subregions: [String],
 countries: [String],
 travellers: [String]
 }
type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
}
type Advisory {
    id: ID!,
    travellerName: String,
    name: String,
    date: String,
    text: String
}
type Mutation {
    postadvisory(travellerName: String, country: String, date: String): Advisory
}
`);

module.exports = { schema };
