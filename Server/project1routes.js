const express = require("express");
const router = express.Router();
const setupAlerts = require("./setupalerts");

//define a default route to execute the setup alerts function
router.get("/", async (req, res) => {
  let conn;
  try {
    let results = await setupAlerts.setupAlerts();
    res.status(200).send(results);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("setupalerts failed - internal server error");
  }
});

module.exports = router;
