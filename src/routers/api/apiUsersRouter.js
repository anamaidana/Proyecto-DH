const express = require('express');

const router = express.Router();
const apiUsersController = require('../../controllers/api/apiUsersController');


/* Páginas de usuarios */
router.get("/:id", apiUsersController.profile);
router.get("/", apiUsersController.list);

module.exports = router;