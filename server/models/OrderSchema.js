const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);




const Billing = new mongoose.Schema({
    fullName: String,
    mnplct: String,
    phone: String,
    state: Number,
    street: String
})

const CartItem = new mongoose.Schema({
    pName: String,
    buyPrice: Number,
    newPrice: Number,
    imgs: [String],
    quantity: Number,
    size: String,
    color: String
})




const OrderSchema = new mongoose.Schema({
    id : Number,
    totalPrice: {
        type: Number,
        required: true
    },
    cart: [CartItem],
    billingInfo: Billing


}, { timestamps: true })

OrderSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 10 });

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order