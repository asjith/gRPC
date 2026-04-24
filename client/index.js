const express = require("express");
const client = require("./client.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  client.getAllCustomers({}, (error, data) => {
    res.json(data.customers);
  });
});

app.listen(3000, () => {
  console.log("server is up at port 3000");
});
