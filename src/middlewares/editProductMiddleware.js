const { body } = require('express-validator');

// validación
const validationEdit = [
    body('name').notEmpty().withMessage('Ingresá un nombre')
    .isLength({ min: 5 }).withMessage('El nombre debe contener al menos 5 caracteres'),
    body('price').notEmpty().withMessage('Ingresá un precio para el producto').bail()
    .custom((value, { req }) => req.body.price > 0).withMessage("El precio debe ser mayor a 0"),
    body('description').notEmpty().withMessage('Ingresá una descripción')
    .isLength({ min: 20 }).withMessage('La descripción debe contener al menos 20 caracteres'),
    body('nutritional').notEmpty().withMessage('Ingresá una información nutricional')
    .isLength({ min: 50 }).withMessage('La descripción nutricional debe contener al menos 50 caracteres'),
    body('category').notEmpty().withMessage('Ingresá una categoria'),

];

module.exports = validationEdit;