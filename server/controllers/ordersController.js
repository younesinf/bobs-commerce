const Order = require("../models/OrderSchema")


const newOrder = async (req, res) => {
    const { totalPrice, cart, billingInfo } = req.body

    if (!totalPrice || !cart || !billingInfo) {
        return res.status(400).json({ error: "All fields must be filled" })
    }

    try {
        const order = await Order.create({
            totalPrice, cart, billingInfo
        })
        res.status(201).json({ message: "Order succesfully created", order })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const getOrders = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const orders = await Order.find({})
            .sort({ "createdAt": -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        const count = await Order.countDocuments();
        if (orders.length === 0) {
            return res.status(200).json({ message: "There is no orders" })
        }

        const orders1 = await Order.find()
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        const oneDayAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

        const filterAndSum = (startDate) => {
            return orders1
                .filter(order => new Date(order.createdAt) > startDate)
                .reduce((acc, order) => acc + order.totalPrice, 0);
        };

        const monthTotal = filterAndSum(oneMonthAgo)
        const weekTotal = filterAndSum(oneWeekAgo)
        const dayTotal = filterAndSum(oneDayAgo)

        return res.json({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            count,
            monthTotal, weekTotal, dayTotal
        });
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const getOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.find({ id })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const delOrder = async (req, res) => {
    const { id } = req.params
    try {
        await Order.findOneAndDelete({ id })
        res.status(200).json({ message: "Order successfully deleted" })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
module.exports = { newOrder, getOrders, getOrder, delOrder }