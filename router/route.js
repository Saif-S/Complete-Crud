const express = require('express');
const app = module.exports = express.Router();

const {showRole, createRole, showAllRole} = require('../controller/role');
const {createOrganization, showOrganization, showAllOrganization} = require('../controller/organization');
const {createState, showState, showAllState} = require('../controller/state');
const {createUser, showUser, showAllUser} = require('../controller/user');
const {createBill,showAllBill, showBill} = require('../controller/bill');
const {createBillPayment, showAllBillPayment, showBillPayment} = require('../controller/bill_payment');
const {addCard, showAllCard, showCard} = require('../controller/card');


app.post('/add-role', createRole);
app.post('/add-org', createOrganization);
app.post('/add-state', createState);
app.post('/add-user', createUser);
app.post('/add-bill', createBill);
app.post('/add-billPayment', createBillPayment);
app.post('/add-card', addCard);
app.get('/show-card', showAllCard);
app.get('/show-card/:id', showCard);
app.get('/show-state/:id', showState);
app.get('/show-state', showAllState)
app.get('/show-org/:id', showOrganization);
app.get('/show-org', showAllOrganization);
app.get('/show-role', showAllRole);
app.get('/show-role/:id', showRole);
app.get('/show-user/:id', showUser);
app.get('/show-user', showAllUser);
app.get('/show-bill',showAllBill);
app.get('/show-bill/:id', showBill);
app.get('/show-billPayment', showAllBillPayment);
app.get('/show-billPayment/:id', showBillPayment);

module.exports = app;