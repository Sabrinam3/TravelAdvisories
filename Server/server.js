const { port, graphql, server } = require("./config");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const app = express();
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const path = require("path");
const cors = require("cors");

app.use(cors());
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.listen(port, () => {
  console.log(`Server ready at ${server}:${port}${graphql}`);
});
