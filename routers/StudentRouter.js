const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
// hien thi danh sach sinh vien
router.get('/',StudentController.index);
// hien thi tao moi sinh vien
router.get('/create',StudentController.create);
// luu form tao sinh vien
router.post('/store',StudentController.store); // post la tao moi
// hien thi form chinh sua sinh vien
router.get('/edit/:id',StudentController.edit);
// luu form cap nhap sinh vien
router.post('/update',StudentController.update); 
// xoa sinh vien
router.get('/destroy/:id',StudentController.destroy); 
module.exports = router;
// const express = require('express');
// const router = express.Router();