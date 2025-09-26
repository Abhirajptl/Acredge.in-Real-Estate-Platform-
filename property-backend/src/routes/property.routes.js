const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/property.controller');


// GET /properties
router.get('/properties', ctrl.getAll);


// GET /properties/:id
router.get('/properties/:id', ctrl.getById);


// GET /search
router.get('/search', ctrl.search);


// GET /recommendations/:id
router.get('/recommendations/:id', ctrl.recommendations);


module.exports = router;