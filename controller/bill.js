const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const bill = model.bill;

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
        bill.create({
            amount: req.body.amount,
            initiated_by: req.body.initiated_by,
            approved_by: req.body.approved_by,
            initiated_at: req.body.initiated_at,
            approved_at: req.body.approved_at,
            status: req.body.status,
            OrganizationId: req.body.orgId,
            StateId: req.body.stateId
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted Seq'});
        });
    } catch(err){
        res.status(500).send({Error: err});
    }
}

module.exports = {createBill};