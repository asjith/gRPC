const express = require("express");
const client = require("./client.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  client.getAllCustomers({}, (error, data) => {
    res.json(data.customers);
  });
});

app.get("/customer/:id", (req, res) => {
  client.getCustomer({ id: req.params.id }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(data);
  });
});

app.post("/", (req, res) => {
  client.addCustomer(
    { id: Date.now().toString(), name: req.body.name, age: req.body.age },
    (err, data) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json({ message: "new customer added" });
    }
  );
});

app.put("/customer/:id", (req, res) => {
  client.updateCustomer({ id: req.params.id, ...req.body }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({ message: "customer updated" });
  });
});

app.delete("/customer/:id", (req, res) => {
  client.deleteCustomer({ id: req.params.id }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({ message: "customer deleted" });
  });
});

app.listen(3000, () => {
  console.log("server is up at port 3000");
});
