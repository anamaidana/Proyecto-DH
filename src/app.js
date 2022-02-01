const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const path = require('path');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Routers
const mainRouter = require('./routers/mainRouter');
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');
const adminUsersRouter = require('./routers/adminUsersRouter');
const cartRouter = require('./routers/cartRouter');
const apiProductsRouter = require('./routers/api/apiProductsRouter');
const apiUsersRouter = require('./routers/api/apiUsersRouter');

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(logger('dev'));
app.use(
    session({
        secret: "Shh, it's a secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.resolve('public')));
app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/users', adminUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);
app.use((req, res) => res.status(404).render('404'));

// server
const server = 3000;
app.listen(server, () => console.log(`servidor en puerto ${server}`));