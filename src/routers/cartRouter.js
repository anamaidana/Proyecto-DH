const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const addCartValidator = require('../middlewares/addCartValidator');

const cartController = require('../controllers/cartController');

router.get('/', authMiddleware, cartController.cart);
router.post('/addCart', authMiddleware, addCartValidator.addCart, cartController.addCart);
router.post('/delete', authMiddleware, cartController.deleteCart);
router.post('/shop', authMiddleware, cartController.shop);
router.get('/historial', authMiddleware, cartController.history);
router.get('/detailshop/:id', authMiddleware, cartController.buyDetail);

module.exports = router;