const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

//middleware to recive json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from node Api");
});

//Get All data from DB
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get single data from database
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//Post method to create product on DB
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update a product in Db
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//Delete a product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "product ot found" });
    }
    res.status(200).json({ message: "product deleted successfully" });
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
