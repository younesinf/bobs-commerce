const { newOrder,getOrders,getOrder,delOrder } = require('../controllers/ordersController')
const router = require('express').Router()



router.get("/", getOrders)
router.get("/:id", getOrder)
router.delete("/:id", delOrder)
router.post('/new',newOrder)



module.exports = router