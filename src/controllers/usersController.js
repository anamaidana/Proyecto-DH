const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const db = require("../database/models");

const usersController = {
    /* GET - formulario de creación de usuarios */
    register: (req, res) => res.render('../views/users/register'),

    /* Procesar registro */
    processRegister: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        if (await db.User.findOne({
                where: { email: req.body.email }
            })) {
            return res.render('../views/users/register', {
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
        const userCreated = await db.User
            .create(userToCreate)
        const userToLogin = {
            name: req.body.name,
            email: req.body.email,
            image: req.file.filename,
            user_id: userCreated.user_id,
        }
        req.session.userLogged = userToLogin // Logea al usuario y lo guarda en session
        return res.redirect('profile')
    },

    // Formulario de LOGIN
    login: (req, res) => res.render('users/login'),

    // Proceso de LOGIN
    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        db.User.findOne({
                where: { email: req.body.email }
            })
            .then((userToLogin) => {
                if (userToLogin) {
                    const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (isOkPassword) {
                        req.session.userLogged = userToLogin;

                        if (req.body.rememberUser) {
                            res.cookie({ where: { email: req.body.email } }, { maxAge: 1000 * 60 * 2 })
                        }
                        return res.redirect('profile');
                    }
                    return res.render('users/login', {
                        OldData: req.body,
                        errors: {
                            password: {
                                msg: 'Contraseña incorrecta'
                            }
                        }
                    });
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'verifica tu email'
                        }
                    }
                })
            })

    },

    // Perfil de Usuario
    profile: async(req, res) => {
        const user = await db.User.findOne({
            where: { 'email': req.session.userLogged.email }
        })
        return res.render('users/profile', { user });
    },

    // Logout de USUARIO
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },
    // Formulario de EDICION de USUARIO
    edit: (req, res) => {
        db.User
            .findByPk(req.params.id)
            .then(user => {
                res.render('users/editProfile', { user });
            })
    },

    // Proceso de EDICION de USUARIO
    update: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/editProfile', {
                errors: resultValidation.mapped(),
                user: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                    rights: 1,
                    user_id: req.params.id
                }
            })
        }
        const data = req.body;
        data.name = req.body.name;
        data.email = req.body.email;
        data.password = bcrypt.hashSync(req.body.password, 10);
        data.confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
        data.image = req.file ? req.file.filename : req.body.oldImage;

        await db.User
            .update(data, {
                where: {
                    user_id: req.params.id
                }
            })
            .then(user => {
                res.redirect('/')
            })
            .catch(error => res.send(error));
    },

}
module.exports = usersController;