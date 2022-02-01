const { validationResult } = require('express-validator');
const db = require('../database/models');

const cartController = {
    cart: (req, res) => {
        db.Item.findAll({
                where: {
                    state: 1,
                    user_id: req.session.userLogged.user_id
                },
                include: {
                    all: true,
                    nested: true
                }
            })
            .then((items) => {
                const total = items.reduce((total, item) => (total = total + Number(item.subtotal)), 0)

                res.render('cart/cart', { cartProduct: items, total });
            })

    },

    addCart: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {

            db.Product.findByPk(req.body.product_id)
                .then((products) =>

                    // Crear mi items

                    db.Item.create({
                        price: req.body.price,
                        quantity: req.body.quantity,
                        subtotal: req.body.quantity * req.body.price,
                        state: 1,
                        user_id: req.session.userLogged.user_id,
                        product_id: products.product_id,
                        cart_id: null

                    })
                    .then(item => res.redirect('/cart'))
                    .catch(error => console.log(error))
                )
        } else {
            db.Product.findByPk(req.body.product_id)
                .then(product => {
                    res.render('/cart', { product, errors: errors.mapped() });
                })
        }
    },

    deleteCart: (req, res) => {
        db.Item.destroy({
                where: {
                    product_id: req.body.item_id,
                    user_id: req.session.userLogged.user_id
                }
            })
            .then(() => res.redirect('/cart'))
            .catch(error => console.log(error))
    },

    shop: (req, res) => {
        let totalPrice = 0;
        db.Item.findAll({
                where: {
                    user_id: req.session.userLogged.user_id,
                    state: 1
                }
            })
            .then((items) => {
                totalPrice = items.reduce((total, item) => (total = total + Number(item.subtotal)), 0)
            })
        db.Cart.findOne({
                orderNumber: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((cart) => db.Cart.create({
                orderNumber: cart ? cart.orderNumber + 1 : 1,
                total: totalPrice,
                user_id: req.session.userLogged.user_id,
                payment: 'mercadoPago'
            }))
            .then(cart => {
                db.Item.update({
                    state: 0,
                    cart_id: cart.cart_id
                }, {
                    where: {
                        user_id: req.session.userLogged.user_id,
                        state: 1
                    }
                })
            })
            .then(() => res.redirect('/cart/historial'))
            .catch(error => console.log(error))
    },

    history: (req, res) => {
        db.Cart.findAll({
                where: {
                    user_id: req.session.userLogged.user_id
                },
                include: {
                    all: true,
                    nested: true
                }
            })
            .then(carts => {
                res.render('cart/historial', { carts });
            })
    },
    buyDetail: (req, res) => {
        db.Cart.findByPk(req.params.id, {
                include: {
                    all: true,
                    nested: true
                }
            })
            .then((cart) => {
                res.render('cart/detailshop', { cart });
            })
    }
};

module.exports = cartController;