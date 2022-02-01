const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const db = require('../database/models');

const Op = db.Sequelize.Op;

const adminUserController = {

    /* GET - listado de productos MYSQL */
    list: async(req, res) => {
        db.User.findAll()
            .then(users => {
                res.render('users/adminUsers', { users })
            })
    },

    /* GET - formulario de creación de productos JSON y MYSQL */
    create: (req, res) => res.render('users/createUser'),

    /* POST - Acción de creación a donde se envia el formulario MYSQL */
    save: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/createUser', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        if (await db.User.findOne({
                where: { email: req.body.email }
            })) {
            return res.render('../views/users/createUser', {
                oldData: req.body,
                errors: {
                    email: {
                        msg: 'El mail ya se encuentra registrado'
                    }
                }
            });
        }

        const userToCreate = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
            image: req.file.filename,
            rights: 1
        };
        db.User
            .create(userToCreate)
        return res.redirect('/')
    },

    /* GET - formulario de edición de productos MYSQL */
    edit: (req, res) => {
        db.User
            .findByPk(req.params.id)
            .then(user => {
                res.render('users/editUser', { user });
            })

    },

    /* PUT - Acción de edición a donde se envia el formulario MYSQL */
    update: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/editUser', {
                errors: resultValidation.mapped(),
                user: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                    rights: req.body.rights,
                }
            })
        }
        await db.User
            .update({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
                rights: req.body.rights,
            }, {
                where: {
                    user_id: req.params.id
                }
            })
            .then(user => {
                res.redirect('/')
            })
            .catch(error => res.send(error));
    },

    /* DELETE - Acción de borrado en MYSQL */
    delete: (req, res) => {
        db.User
            .destroy({
                where: {
                    user_id: req.params.id
                },
                force: true
            })
            .then(confirm => {
                res.redirect('adminUsers');
            })
    },

    /* SEARCH - Buscar un producto MYSQL */
    search: (req, res) => {
        db.User.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                }
            })
            .then(result => { res.render('users/adminUsers', { users: result }); })
            .catch(error => res.send(error));
    }
};

module.exports = adminUserController;