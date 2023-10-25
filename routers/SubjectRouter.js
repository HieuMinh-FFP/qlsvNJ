const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/SubjectController');
// hien thi danh sach môn học
router.get('/',SubjectController.index);
// hien thi tao moi môn học
router.get('/create',SubjectController.create);
// luu form tao môn học
router.post('/store',SubjectController.store); // post la tao moi
// hien thi form chinh sua môn học
router.get('/edit/:id',SubjectController.edit);
// luu form cap nhap môn học
router.post('/update',SubjectController.update); 
// xoa môn học
router.get('/destroy/:id',SubjectController.destroy); 
module.exports = router;
// const express = require('express');
// const router = express.Router();