const express = require('express');
const app = module.exports = express.Router();

const {showRole, createRole, showAllRole, updateRole, deleteRole} = require('../controller/role');
const {createOrganization, showOrganization, showAllOrganization, updateOrganization, deleteOrganization} = require('../controller/organization');
const {createState, showState, showAllState, updateState, deleteState} = require('../controller/state');
const {createUser, showUser, showAllUser, updateUser, deleteUser} = require('../controller/user');
const {createBill,showAllBill, showBill, updateBill, deleteBill} = require('../controller/bill');
const {createBillPayment, showAllBillPayment, showBillPayment, updateBillPayment, deleteBillPayment} = require('../controller/bill_payment');
const {addCard, showAllCard, showCard, updateCard, deleteCard} = require('../controller/card');


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
app.put('/update-billPayment/:id', updateBillPayment);
app.put('/update-bill/:id', updateBill);
app.put('/update-card/:id', updateCard);
app.put('/update-org/:id', updateOrganization);
app.put('/update-role/:id', updateRole);
app.put('/update-state/:id', updateState);
app.put('/update-user/:id', updateUser);
app.delete('/delete-billPayment/:id', deleteBillPayment);
app.delete('/delete-bill/:id', deleteBill);
app.delete('/delete-card/:id', deleteCard);
app.delete('/delete-org/:id', deleteOrganization);
app.delete('/delete-role/:id', deleteRole);
app.delete('/delete-state/:id', deleteState);
app.delete('/delete-user/:id', deleteUser);

module.exports = app;