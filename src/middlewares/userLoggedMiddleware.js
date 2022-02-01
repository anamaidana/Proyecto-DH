const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.email;

    if (emailInCookie) {
        req.session.userLogged = emailInCookie;
        const userFromCookie = db.User.findOne({ where: { email: emailInCookie } })

        if (emailInCookie && userFromCookie) {
            req.session.userLooged = userFromCookie
        }
    }
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;