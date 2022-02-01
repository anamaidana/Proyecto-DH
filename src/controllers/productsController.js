const { validationResult } = require('express-validator')
const db = require('../database/models');

const Op = db.Sequelize.Op;

const productsController = {

    /* GET - listado de todos los productos MYSQL */
    all: async(req, res) => {
        db.Product.findAll()
            .then(product => {
                res.render('products/products', { product })
            })
            .catch(error => res.send(error));
    },
    /* GET - detalle de un producto en particular MYSQL */
    detail: async(req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('products/productDetail', { product });
            })
            .catch(error => res.send(error));
    },

    /* GET - listado de productos MYSQL */
    list: async(req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render('products/adminProduct', { products })
            })
    },

    /* GET - formulario de creación de productos JSON y MYSQL */
    create: (req, res) => res.render('products/createProduct'),

    /* POST - Acción de creación a donde se envia el formulario MYSQL */
    save: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('products/createProduct', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        if (await db.Product.findOne({
                where: { productName: req.body.name }
            })) {
            return res.render('../views/products/createProduct', {
                oldData: req.body,
                errors: {
                    name: {
                        msg: 'El nombre ya se encuentra registrado'
                    }
                }
            });
        }

        const data = {
            productName: req.body.name,
            productPrice: req.body.price,
            shortDescription: req.body.description,
            nutritionalDetail: req.body.nutritional,
            productCategory: req.body.category,
            productImage: req.file.filename,
        }
        db.Product
            .create(data)
            .then(product => {
                res.redirect('adminProduct');
            })

    },

    /* GET - formulario de edición de productos MYSQL */
    edit: (req, res) => {
        db.Product
            .findByPk(req.params.id)
            .then(product => {
                res.render('products/editProduct', { product });
            })

    },

    /* PUT - Acción de edición a donde se envia el formulario MYSQL */
    update: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('products/editProduct', {
                errors: resultValidation.mapped(),
                product: {
                    productName: req.body.name,
                    productPrice: req.body.price,
                    shortDescription: req.body.description,
                    nutritionalDetail: req.body.nutritional,
                    productCategory: req.body.category,
                    product_id: req.params.id
                }
            })
        }
        const data = {
            productName: req.body.name,
            productPrice: req.body.price,
            shortDescription: req.body.description,
            nutritionalDetail: req.body.nutritional,
            productCategory: req.body.category,
            productImage: req.file ? req.file.filename : req.body.oldImage,
        }
        await db.Product
            .update(data, {
                where: {
                    product_id: req.params.id
                }
            })
            .then(product => {
                res.redirect('/')
            })
            .catch(error => res.send(error));
    },

    /* DELETE - Acción de borrado en MYSQL */
    delete: (req, res) => {
        db.Product
            .destroy({
                where: {
                    product_id: req.params.id
                },
                force: true
            })
            .then(confirm => {
                res.redirect('adminProduct');
            })
    },

    /* SEARCH - Buscar un producto MYSQL */
    search: (req, res) => {
        db.Product.findAll({
                where: {
                    productName: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            })
            .then(result => { res.render('products/adminProduct', { products: result }); })
            .catch(error => res.send(error));
    }
};

module.exports = productsController;