const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    pName: {
        type: String,
        required: true,
    },
    sDesc: {
        type: String,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    imgs: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    category: {
        type: String,
        required: true,
    },

}, { timestamps: true })

ProductSchema.plugin(AutoIncrement, { inc_field: '_id', start_seq: 10 });

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product