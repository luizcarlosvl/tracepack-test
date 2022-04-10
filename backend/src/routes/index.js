const express = require('express');

const controllers = require('../controllers/users.controllers');

const router = express.Router();

router.post('/register', controllers.userCreate);

router.post('/login', controllers.userLogin);

/* router.post('/products', productCreate);

router.get('/products', getAll);

router.get('/products/:id', findById);

router.put('/products/:id', editProduct);

router.delete('/products/:id', deleteProduct);

router.post('/sales', salesCreate);

router.get('/sales', getAllSales);

router.get('/sales/:id', findSalesById);

router.delete('/sales/:id', deleteSale);

router.put('/sales/:id', editSale); */

module.exports = router;