const express = require('express');
const app = module.exports = express.Router();

const {showRole, createRole} = require('../controller/role');
const {createOrganization, showOrganization} = require('../controller/organization');
const {createState, showState} = require('../controller/state');
const {createUser} = require('../controller/user');
const {createBill} = require('../controller/bill');
const {createBillPayment} = require('../controller/bill_payment');
const {addCard} = require('../controller/card');


app.post('/add-role', createRole);
app.get('/show-role', showRole);
app.post('/add-org', createOrganization);
app.get('/show-org', showOrganization);
app.post('/add-state', createState);
app.get('/show-state', showState);
app.post('/add-user', createUser);
app.post('/add-bill', createBill);
app.post('/add-billPayment', createBillPayment);
app.post('/add-card', addCard);

module.exports = app;