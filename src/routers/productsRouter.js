const express = require('express');

const router = express.Router();

// Middlewares
const upload = require('../middlewares/uploadProductMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationCreate = require('../middlewares/createProductMiddleware');
const validationEdit = require('../middlewares/editProductMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Controller
const productsController = require('../controllers/productsController');

router.get('/', productsController.all); /* GET - dellate de un producto en particular */
router.get('/adminProduct', authMiddleware, adminMiddleware, productsController.list); /* GET - listado de productos para administrar */
router.get('/createProduct', authMiddleware, adminMiddleware, productsController.create); /* GET - formulario de creación de productos */
router.post('/createProduct', upload.single('image'), validationCreate, productsController.save); /* POST - Acción de edición a donde se envia el formulario */
router.get('/editProduct/:id', adminMiddleware, productsController.edit); /* GET - formulario de edición de productos */
router.put('/editProduct/:id', upload.single('image'), validationEdit, productsController.update); /* PUT - Acción de edición a donde se envia el formulario */
router.delete('/:id', productsController.delete); /* DELETE un producto */
router.get('/:id/', productsController.detail); /* GET - dellate de un producto en particular */
router.get('/adminProduct/search', productsController.search); /* GET - buscar de un producto */

module.exports = router;