const router = require('express').Router();
const studentModel = require('../models/formModel');

router.post('/form/', async function (req, res) {
 await studentModel.create(req.body);
 res.send('Student Enrolled Successfully...');
});

router.get('/form/', async function (req, res) {
 var student = await studentModel.find();
 res.json(student);
});

router.put('/form/', async function (req, res) {
 await studentModel.findByIdAndUpdate(req.body.id, {$set: req.body});
 res.send('Student Updated Successfully...');
});

router.delete('/form/', async function (req, res) {
 await studentModel.findByIdAndDelete(req.body.id);
 res.send('Student Deleted Successfully...');
});

module.exports = router;