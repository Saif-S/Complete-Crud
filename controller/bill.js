const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const Op = require('sequelize');
const Bill = model.bill;

function approvebill(req, res){
    try {
        Bill.update({
            approved_by: req.userId,
            approved_at: Date.now(),
            status: "Approved"
        }, {
            where: {
                id: req.body.id
            }
        }).then(result => {
            if(!result[0]){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({msg: 'Data updated'})
            }
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function createBill(req, res){
//     const amount = req.body.amount;
//     const init_by = req.body.initiated_by;
//     const approved_by = req.body.approved_by;
//     const init_at = req.body.initiated_at;
//     const approved_at = req.body.approved_at;
//     const status = req.body.status;
//     const org_id = req.body.org_id;
//     const state_id = req.body.state_id;
//     conn.query('insert into bills set amount = ?, initiated_by = ?, approved_by = ?, initiated_at = ?,approved_at = ?, status = ?, OrganizationId = ?, StateId = ?',
//     [amount, init_by, approved_by, init_at, approved_at, status, org_id, state_id], (err, result) => {
//         if(err) throw err;
//         res.status(200).send({msg: 'Data Inserted'});
//     });
// }

function createBill(req, res){
    try{
        Bill.create({
            amount: req.body.amount,
            initiated_by: req.userId,
            initiated_at: Date.now(),
            status: "Pending",
            OrganizationId: req.orgId,
            StateId: req.body.stateId,
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted'});
        });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

function showAllBill(req, res){
    try {
        Bill.findAll().then((bill) => {
            if(!bill){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({Result: bill});
            }
        })
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function showAllBill(req, res){
//     try {
//         conn.query('select * from bills', (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

function showBill(req, res){
    try { 
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            if(!bill){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({Result: bill});
            }
        })
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function showBill(req, res){
//     try{   
    // id = req.params.id;
//         conn.query('select * from bills where id = ?', id, (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         });
//     } catch(error){
//         res.status(500).send({Error: error});
//     }
// }

function updateBill(req, res){
    try {
        Bill.update({
            amount: req.body.amount,
            initiated_by: req.body.initiated_by,
            approved_by: req.body.approved_by,
            initiated_at: req.body.initiated_at,
            approved_at: req.body.approved_at,
            status: req.body.status,
            OrganizationId: req.body.OrganizationId,
            StateId: req.body.stateId
        },{
            where:{
                id: req.params.id
            }
        }).then((bill) => {
            if(!bill[0]){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({msg: 'Data Updated'});
            }
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function updateBill(req, res){
//     const amount = req.body.amount;
//     const init_by = req.body.initiated_by;
//     const approved_by = req.body.approved_by;
//     const init_at = req.body.initiated_at;
//     const approved_at = req.body.approved_at;
//     const status = req.body.status;
//     const org_id = req.body.OrganizationId;
//     const state_id = req.body.stateId;
//     const id = req.params.id;
//     conn.query('update bills set  amount =?,initiated_by =?,approved_by =?,initiated_at =?,approved_at =?,status =?,OrganizationId =?,StateId =? where id = ?',
//     [amount, init_by, approved_by, init_at, approved_at, status, org_id, state_id, id], (err, result) => {
//         if(err) throw err;
//         res.status(200).send({msg: 'Data Updated'});
//     });
// }

// function deleteBill(req, res){
//     id = req.params.id
//     conn.query('delete from bills where id = ?', id, (err, result) => {
//         if(err) throw err
//         res.status(200).send({msg: 'Data deleted'});
//     });
// }

function deleteBill(req, res){
    try {
        Bill.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if(!result){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({msg: 'Data deleted'});
            }
        });
    } catch (error) {
     res.status(500).send({Error: error});  
    }
}

// function billStatus(req,res){
//     const id = req.orgId;
//     const status = req.body.status;
//     conn.query("select * from bills where status = ? and Organizationid = ?",[status, id], (err, resut) => {
//         if(err) throw err
//         res.status(200).send({Result: resut});
//     }); 
// }

function billStatus(req, res){
    Bill.findAll({
        where: {
            OrganizationId: req.orgId,
            status: req.body.status
        }
    }).then((result) => {
        if(!result){
            res.status(404).send({msg: 'No data found'});
        } else {
            res.status(200).send({Result: result});
        }
    })
}

function findOperator(req, res, next){
    Bill.findAll({
        where: Op.and(
            {OrganizationId: req.body.OrganizationId},
            {StateId: req.body.StateId}
        )
    }).then(bill => {
        if(!bill[0]){
            res.status(404).send({msg: 'No data found'});
        } else {
            res.status(200).send({Result: bill});
        }
    });
}

// function findOperator(req, res, next){
//     OrganizationId = req.body.OrganizationId;
//     StateId = req.body.StateId
//     conn.query('select * from bills where OrganizationId = ? or StateId = ?', [OrganizationId, StateId], (err, result) => {
//         if(err) throw err;
//         res.status(200).send({msg: result});
//     });
// }

module.exports = {createBill, showAllBill, showBill, updateBill, deleteBill, billStatus, approvebill, findOperator}