const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

//middleware to recive json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from node Api");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//  DB connection using mongoose
mongoose
  .connect(
    "mongodb+srv://vedhatech:vREnPpwDB0BGdYWD@backenddb.xqsb0sj.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("conected to database!");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("conection failed!");
  });
