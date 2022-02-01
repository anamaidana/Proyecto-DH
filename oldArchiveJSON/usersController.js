const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');
const User = require('../models/Users');

const usersController = {
    /* GET - formulario de creación de usuarios */
    register: (req, res) => {
        return res.render('../views/users/register');
    },

    /* Procesar registro */
    processRegister: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        const userInDB = User.findByField('email', req.body.email)
        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
        const userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
            image: req.file.filename
        }
        const userCreated = User.create(userToCreate);
        return res.redirect('login');
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
        const userToLogin = User.findByField('email', req.body.email);
        if (userToLogin) {
            const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                }
                return res.redirect('profile')
            }
            return res.render('users/login', { errors: { email: { msg: 'Las credenciales son inválidas' } } });
        }
        return res.render('users/login', { errors: { email: { msg: 'El mail no se encuentra registrado' } } });
    },

    // Perfil de Usuario
    profile: (req, res) => {
        res.render('users/profile', {
            user: req.session.userLogged,
        });
    },

    // Logout
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};
module.exports = usersController;