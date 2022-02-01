const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => {
        const viewData = {
            product: products,
        };
        res.render('home', viewData);
    },

    cart: (req, res) => res.render('cart'),
};

module.exports = mainController;