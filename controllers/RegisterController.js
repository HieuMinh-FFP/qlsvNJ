const session = require('express-session');
const registerModel = require('../models/Register');
const studentModel = require('../models/Student');
const subjectModel = require('../models/Subject');
const { format } = require('date-fns');
// const registerModel = require('../models/Register');
class RegisterController {

    //RegisterController
    static module = 'register';
    static index = async (req, res) => {
        try {

            const search = req.query.search;
            const page = Number(req.query.page || 1);
            const item_per_page = process.env.ITEM_PER_PAGE;
            // goi model de lay du lieu
            // goi tu class, khong can phai new register()
            let registers = [];
            let totalRegisters = [];
            if (search) {
                // du lieu đã phân trang
                registers = await registerModel.getByPattern(search, page, item_per_page);
                // du lieu chưa phân trang
                totalRegisters = await registerModel.getByPattern(search);
            } else {
                // du lieu đã phân trang
                registers = await registerModel.all(page, item_per_page);
                // du lieu chưa phân trang
                totalRegisters = await registerModel.all();
            }
            // ceil la lam tron nha : tran nha
            // .length la dem so luong phan tu trong danh sach
            const totalPage = Math.ceil(totalRegisters.length / item_per_page);
            // console.log('test:', format(new Date(11, 1, 2014), 'dd-MM-yyyy' ))
            //  registers = await registerModel.all();
            // console.log(registers);
            const message_success = req.session.message_success;
            const message_error = req.session.message_error;
            // chủ động xóa message
            delete req.session.message_success;
            delete req.session.message_error;
            res.render('register/index', {
                registers: registers,
                format: format,
                search: search,
                totalPage: totalPage,
                page: page,
                message_success: message_success,
                message_error: message_error,
                module: this.module,
            });
            res.end();
        } catch (error) {
            // registers.forEach((register,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
    static create = async (req, res) => {
        try {
            const students = await studentModel.all();
            const subjects = await subjectModel.all();
            res.render('register/create', {
                module: this.module,
                students: students,
                subjects: subjects
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static store = async (req, res) => {
        try {
            const student = await studentModel.find(req.body.student_id);
            const student_name = student.name;
            const subject = await subjectModel.find(req.body.subject_id);
            const subject_name = subject.name;
            // console.log(req.body);
            // luu du lieu vao database , trong req
            await registerModel.save(req.body);
            // luu session vao req
            req.session.message_success = ` Sinh viên ${student_name} đăng ký môn học ${subject_name} thành công`;

            // res.render('register/create');
            // dieu huong ve trang mong muon)
            res.redirect('/register');
            // res.send(req.body);
            // res.end();
        } catch (error) {

            req.session.message_error = ` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/register');
        }
    }
    static edit = async (req, res) => {
        const register = await registerModel.find(req.params.id);
        // aaa
        try {
            res.render('register/edit', {
                register: register,
                module: this.module
            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static update = async (req, res) => {
        try {
            const id = req.body.id;
            const score = req.body.score;
            // console.log('a11');
            // const register_id = req.body.register_id;
            // lay register tu database len
            const register = await registerModel.find(id);

            //cap nhat diem
            register.score = score;
            console.log(register);

            // luu no xuong database
            await register.update();
            // luu session vao req
            // console.log('a117');
            const student_name = register.student_name;
            const subject_name = register.subject_name;

            req.session.message_success = ` Sinh viên ${student_name} thi môn ${subject_name} đã được điểm ${score}`;
            // res.render('register/create');
            // dieu huong ve trang mong muon)
            res.redirect('/register');
            // res.send(req.body);
            // res.end();
        } catch (error) {
            req.session.message_error = ` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/register');
        }
    }
    static destroy = async (req, res) => {
        try {

            // lay register tu database len
            const register = await registerModel.find(req.params.id); // lay số 1 ở http://qlsv.com/edit/1 thì dung params
            await register.destroy();
            req.session.message_success = ` đã xóa  ${register.student_name} với đăng ký môn học ${register.subject_name}  thành công`;
            res.redirect('/register');
        } catch (error) {
            req.session.message_error = ` ${error.message}`;
            res.redirect('/register');
        }
    }

}
module.exports = RegisterController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params