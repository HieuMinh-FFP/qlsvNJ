const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
// hien thi danh sach môn học
router.get('/',RegisterController.index);
// hien thi tao moi môn học
router.get('/create',RegisterController.create);
// luu form tao môn học
router.post('/store',RegisterController.store); // post la tao moi
// hien thi form chinh sua môn học
router.get('/edit/:id',RegisterController.edit);
// luu form cap nhap môn học
router.post('/update',RegisterController.update); 
// xoa môn học
router.get('/destroy/:id',RegisterController.destroy); 
module.exports = router;
// const express = require('express');
// const router = express.Router();