const express = require('express');

const userControllers = require('../controllers/users.controllers');
const pointsController = require('../controllers/points.controllers');

const router = express.Router();

router.post('/register', userControllers.userCreate);

router.post('/login', userControllers.userLogin);

router.post('/points', pointsController.featurePoints);

router.get('/points/:email', pointsController.getPoints);

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