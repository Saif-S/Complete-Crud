const conn = require('../database/sqlConnection');
const model = require('../database/seq.config');
const bill_pay = model.bill_Payments;

// function createBillPayment(req, res){
//     try{
//         bill_id = req.body.bill_Id;
//         stat = req.body.status;
//         conn.query('insert into bill_Payments SET billId = ?, status = ?', bill_id, stat,(err, result) => {
//             if(err) throw err;
//             res.status(200).send({msg: "Data Inserted"});
//         });  
//     } catch(err){
//         res.status(500).send({Error: err});
//     }
// }

function createBillPayment(req, res){
    try{
        bill_pay.create({
            billId: req.body.billId,
            status: req.body.status
        }).then((a) => {
            return res.status(200).send({msg: 'Data Inserted'});
        })
    } catch(err) {
        res.status(500).send({Error: err});
    }
}

function showAllBillPayment(req, res){
    try {
        bill_pay.findAll().then((bill) => {
            if(!bill){
                res.status(404).send({msg: 'No data found'});
            } else {
                res.status(200).send({Result: bill});
            }
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

// function showAllBillPayment(req, res){
//     try {
//         conn.query('select * from bill_Payments', (err, result) => {
//             if(err) throw err;
//             res.status(200).send({Result: result});
//         })
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

// function showBillPayment(req, res){
//     try {
//         bill_pay.findOne({
//             where: {
//                 id: req.params.id
//             }
//         }).then((bill) => {
//             if(!bill){
//                 res.status(404).send({msg: 'No data found'});
//             } else {
//                 res.status(200).send({Result:bill});
//             }
//         });
//     } catch (error) {
//         res.status(500).send({Error: error});
//     }
// }

function showBillPayment(req, res){
    try {
        id = req.params.id;
        conn.query('select * from bill_Payments where id = ?', id, (err, result) => {
            if(err) throw err;
            res.status(200).send({Result: result});
        });
    } catch (error) {
        res.status(500).send({Error: error});
    }
}

module.exports = {createBillPayment, showAllBillPayment, showBillPayment}