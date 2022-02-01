function adminMiddleware(req, res, next) {
    if (req.session.userLogged.rights != 2) {
        return res.render('404');
    }
    next();
}

module.exports = adminMiddleware;