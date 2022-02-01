const express = require('express');

const router = express.Router();

// Middlewares
const upload = require('../middlewares/uploadUserMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validations = require('../middlewares/registerValidationMiddleware');

// Controller
const adminUserController = require('../controllers/adminUserController');

router.get('/adminUsers', authMiddleware, adminMiddleware, adminUserController.list); /* GET - listado de usuarios para administrar */
router.get('/createUser', authMiddleware, adminMiddleware, adminUserController.create); /* GET - formulario de creación de usuarios */
router.post('/createUser', upload.single('image'), validations, adminUserController.save); /* POST - Acción de edición a donde se envia el formulario */
router.get('/editUser/:id', adminMiddleware, adminUserController.edit); /* GET - formulario de edición de usuarios */
router.put('/editUser/:id', adminUserController.update); /* PUT - Acción de edición a donde se envia el formulario */
router.delete('/:id', adminUserController.delete); /* DELETE un usuario */
router.get('/adminUsers/search', adminUserController.search); /* GET - buscar de un usuario */

module.exports = router;