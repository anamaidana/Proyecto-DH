const path = require('path');
const { body } = require('express-validator');

// validación
const validations = [
  body('name').notEmpty().withMessage('Ingresá tu nombre')
  .isLength({ min: 2 }).withMessage('Debe contener al menos 2 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('Ingresá tu correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingresá un formato válido'),
  body('password').notEmpty().withMessage('Ingresá tu contraseña')
  .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres'),
  body('confirmPassword').notEmpty().withMessage('Confirmá tu contraseña'),

  body('image').custom((value, { req }) => {
    const { file } = req;
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    if (!file) {
      throw new Error('Tienes que subir una imagen');
    } else {
      const fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ','
          )}`
        );
      }
    }
    return true;
  }),
];

module.exports = validations;
