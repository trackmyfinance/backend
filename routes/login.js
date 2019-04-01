const express   =   require('express');
const router    =   express.Router();

router.get('/', (req, res) => {
    res.send('LOGIN PAGE TADAAAA!!!!');
});

module.exports = router;
