import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server is up at port 3000");
});
