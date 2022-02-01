const express = require('express');

const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');


/* Páginas de productos */
router.get("/", apiProductsController.productsAll);
router.get("/:id", apiProductsController.detail);


module.exports = router;