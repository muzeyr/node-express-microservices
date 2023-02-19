const express = require('express');
require('express-async-errors');
const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./prod.model');
const { updateProduct, saveProduct, placeOrder } = require('./utils');

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Users Service at ${port}`);
});

app.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const product = req.body;
    const updatedProduct = await updateProduct(productId, product);
    res.json(updatedProduct);
});

app.post('/', async (req, res) => {
    const product = req.body;
    const savedProduct = await saveProduct(product);
    res.json(savedProduct);
});

app.post('/order', async (req, res) => {
    const productIds = req.body.productIds;
    const products = await placeOrder(productIds);
    res.json(products);
});

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});
