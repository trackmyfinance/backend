const express       =   require('express');
const router        =   express.Router();
const { hash }      =   require('../helpers/hash');
const db            =   require('../database/db');

router.post('/', async (req, res) => {
    let requiredFields = ['username', 'password', 'email'];
    if (!req.hasOwnProperty('body') || !Object.keys(req.body).length) {
        res.status(403).json({ success: 'KO', message: 'Empty body object' });
    }
    requiredFields.forEach(field => {
        if (!req.body[field]) {
            res.status(403).json({ success: 'KO', message: `Missing '${field}' parameter` });
        }
        if (!req.body[field].trim()) {
            res.status(403).json({ success: 'KO', message: `Empty field '${field}'` });
        }
    });
    let credentials = {
        username: req.body.username.trim(),
        email: req.body.email.trim().toLowerCase(),
        password: await hash(req.body.password.trim())
    };
    let query = 'SELECT id FROM users WHERE email = ?;';
    let params = [credentials.email];
    let results = await db.query(query, params).then(([rows, fields]) => rows).catch(err => err);
    if (results instanceof Error) {
        throw new Error(results);
    }
    if (results.length) {
        res.status(403).json({ success: 'KO', message: 'Email already registered. Have you forgotten your password?' });
    } else {
        // TODO: handle the user registration process
    }
});

module.exports = router;
