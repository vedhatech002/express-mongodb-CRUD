const Product = require("../models/product.model.js");

//Get All data from DB
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//get single data from database
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//Post method to create product on DB
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//update a product in Db
const updateProduct = async (req, res) => {
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
};

//Delete a product
const deleteProduct = async (req, res) => {
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
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
