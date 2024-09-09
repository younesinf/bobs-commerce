const { ThisIsAdmin, newProduct, GetProducts, GetProduct, delProduct, updateProduct
    , GetRandomP } = require('../controllers/adminController')
const router = require('express').Router()



router.get("/", ThisIsAdmin)
router.post("/newproduct", newProduct)
router.get('/products', GetProducts)
router.get('/products/random', GetRandomP);
router.get('/product/:id', GetProduct)
router.delete('/product/:id', delProduct)
router.put('/product/:id', updateProduct)




module.exports = router