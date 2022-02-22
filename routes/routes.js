const productsRoutes = require('./apis/products_routes')
const langRoutes = require('./lang/lang')
const router = require('express').Router();

router.use('/', langRoutes)
router.use('/products',productsRoutes)

module.exports = router