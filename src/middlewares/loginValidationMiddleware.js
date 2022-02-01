const { body } = require('express-validator');

// validación LOGIN
const validationsLogin = [
  body('email')
    .notEmpty()
    .withMessage('Ingresá un correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Debe ser un formato de correo válido'),
  body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
];

module.exports = validationsLogin;
