var router = require('express').Router();

router.use('/curation', require('./curation/curationRoutes'));
router.use('/products', require('./products/productsRoutes'));


module.exports = router;