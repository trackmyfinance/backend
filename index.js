/**
 * Require modules
 */
const version           =   '0.0.0';
const dotenv            =   require('dotenv').config();
const morgan            =   require('morgan')('dev');
const express           =   require('express');
const helmet            =   require('helmet');
const compression       =   require('compression');
const bodyParser        =   require('body-parser');
const app               =   express();

/**
 * Require middleware
 */
const auth              =   require('./middleware/auth');

/**
 * Require routes
 */
const loginRoute        =   require('./routes/login');
const registerRoute     =   require('./routes/register');
const usersRoute        =   require('./routes/users');

/**
 * Load middleware
 */
app.use(compression());
app.use(helmet({ hidePoweredBy: { setTo: `TrackMyFinance v${version}` } }));
app.use(bodyParser.json());

/**
 * Define routes and middleware load order
 */
app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.use(auth);

app.use('/users', usersRoute);

/**
 * Launch server
 */
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.SERVER_PORT || 3000}!`);
});
