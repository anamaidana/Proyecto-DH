const path = require('path');
const { body } = require('express-validator');

// validación
const validationsEditProfile = [
    body('name').notEmpty().withMessage('Ingresá tu nombre')
    .isLength({ min: 2 }).withMessage('Debe contener al menos 2 caracteres'),
    body('email')
    .notEmpty()
    .withMessage('Ingresá tu correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingresá un formato válido'),
    body('password').notEmpty().withMessage('Ingresá una nueva contraseña')
    .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres'),
    body('confirmPassword').notEmpty().withMessage('Confirmá la nueva contraseña'),
];

module.exports = validationsEditProfile;