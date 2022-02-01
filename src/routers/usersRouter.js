const express = require('express');

const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const upload = require('../middlewares/uploadUserMiddleware');
const validations = require('../middlewares/registerValidationMiddleware');
const validationsLogin = require('../middlewares/loginValidationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsEditProfile = require('../middlewares/editProfileMiddleware')

router.get('/register', guestMiddleware, usersController.register); // Formulario de REGISTRO
router.post('/register', upload.single('image'), validations, usersController.processRegister);

router.get('/login', guestMiddleware, usersController.login); // Formulario de LOGIN
router.post('/login', validationsLogin, usersController.loginProcess); // Proceso de LOGIN
router.get('/profile', authMiddleware, usersController.profile); // Perfil USUARIO
router.get('/logout', usersController.logout); // Logout USUARIO

router.get('/editProfile/:id', usersController.edit); /* GET - formulario de edición de USUARIO */
router.put('/editProfile/:id', upload.single('image'), validationsEditProfile, usersController.update); /* PUT - Acción de edición a donde se envia el formulario */

module.exports = router;