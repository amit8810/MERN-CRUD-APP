import { Product } from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnailUrl } = req.body;

    if (!title || !description || !price || !thumbnailUrl) {
      return res.status(400).json({
        status: 400,
        error: "Missing required field",
      });
    }

    // const priceInNumber = Number(price.trim())

    const product = await Product.create({
      title,
      description,
      price,
      thumbnailUrl,
    });

    return res.status(201).json({
      status: 201,
      product,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error while creating the Product", error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 200,
      products,
      message: "All Product fetched successfully",
    });
  } catch (error) {
    console.error("Error while fetching all Product", error);
    res.status(400).json({
      status: 400,
      message: "Error while fetching all products",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      status: 200,
      product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error("Errow while fetching the product", error);
    res.status(400).json({
      status: 400,
      message: " Error while fetching the product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Please provide the valid id",
      });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.error("Error while deleting the object", error);
    res.status(400).json({
      status: 400,
      message: "Error while deleting the product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {title, description, price} = req.body;

    if (title || description || price) {
        const updateFields = {};

        if(title) {
            updateFields.title = title;
        }

        if(description) {
            updateFields.description = description;
        }

        if(price) {
            updateFields.price = price;
        }

        const product = await Product.findByIdAndUpdate(productId, updateFields , {new: true});

        if(product) {
            return res.status(200).json({
                status: 200,
                product,
                message: "Product updated successfully"
            })
        } else {
            return res.status(404).json({
                status: 400,
                messgae: "Product not found"
            })
        }

    } else {
        return res.status(400).json({
            status:400,
            messgae: "At least one of the title, description, or price should be provided for updating"
        })
    }
  } catch (error) {
    console.error("Error while updating the Product", error);
    return res.status(500).json({
        status: 500,
        message: "Internal Server Error"
    })
  }
};

export {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
