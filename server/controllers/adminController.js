const Product = require("../models/ProductSchema")


const newProduct = async (req, res) => {
    const {
        pName, sDesc, buyPrice,
        oldPrice, newPrice, imgs, sizes, colors, category
    } = req.body

    if (!pName || !sDesc || !buyPrice || !newPrice ||
        !imgs || !category) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    try {
        const product = await Product.create({
            pName,  sDesc, buyPrice,
            oldPrice, newPrice, imgs, sizes, colors, category
        })
        res.status(201).json({ message: "Product succesfully created", product })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

//GET /api/products?category=Shoes&newPrice[lte]=500

const GetProducts = async (req, res) => {
    const { page = 1, limit = 8, title = "" } = req.query;
    try {
        const query = {};

        if (title) {
            const regex = new RegExp(title, 'i');
            query.pName = { $regex: regex }
        }

        if (req.query.category) query.category = req.query.category;
        if (req.query.newPrice) query.newPrice = {};

       if (req.query.newPrice.lte) query.newPrice.$lte = req.query.newPrice.lte;


        const products = await Product.find(query)
            .sort({ "createdAt": -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Product.countDocuments(query);

        if (products.length === 0) {
            return res.status(200).json({ message: "There is no products" })
        }

        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            count
        })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}


const GetRandomP = async (req, res) => {
    try {
        const randomProducts = await Product.aggregate([
            { $sample: { size: 5 } }  // $sample is an aggregation stage that selects random documents
        ]);
        res.status(200).json(randomProducts);
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const GetProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(200).json({ message: "There is no product with this Id" })
        }
        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
const delProduct = async (req, res) => {
    const { id } = req.params
    try {
        await Product.findOneAndDelete({ _id: id })
        res.status(200).json({ message: "Product successfully deleted" })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
const updateProduct = async (req, res) => {
    const {
        pName, sDesc, buyPrice,
        oldPrice, newPrice, imgs, sizes, colors, category
    } = req.body
    if (!pName || !sDesc || !buyPrice || !newPrice ||
        !imgs || !category) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    const product = await Product.findOne({ _id: req.params.id })
    if (!product) {
        return res.status(400).json({ error: "Product not available" })
    }
    try {
        await Product.findByIdAndUpdate(req.params.id,
            {
                pName, sDesc, buyPrice,
                oldPrice, newPrice, imgs, sizes, colors, category
            })
        res.status(200).json({ message: "Product Updated" })
    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}


const ThisIsAdmin = async (req, res) => {
    res.status(200).send("hello admin")
}

module.exports = {
    ThisIsAdmin, newProduct, GetProducts, GetProduct, delProduct,
    updateProduct, GetRandomP
}