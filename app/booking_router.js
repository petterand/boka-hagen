const router = require('express').Router();
const Recipe = require('./models/Booking');

const isLoggedIn = require('./AuthHelpers').isLoggedIn;

router.get('/', (req, res) => {

});

router.post('/', isLoggedIn, (req, res) => {

});


router.delete('/:id', isLoggedIn, (req, res) => {

});

router.put('/:id', isLoggedIn, (req, res) => {

});

module.exports = router;