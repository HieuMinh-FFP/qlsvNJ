const session = require('express-session');
const studentModel = require('../models/Student');
const { format } =require('date-fns');
const registerModel = require('../models/Register')
// const studentModel = require('../models/Student');
class StudentController{
    //StudentController
    static module = 'student'
   static index = async(req,res) =>{
        try{

            const search = req.query.search;
            const page =Number(req.query.page || 1);
            const item_per_page = process.env.ITEM_PER_PAGE;
             // goi model de lay du lieu
            // goi tu class, khong can phai new student()
            let students = [];
            let totalStudents = [];
            if (search) {
                // du lieu đã phân trang
                students =await studentModel.getByPattern(search, page, item_per_page);
                // du lieu chưa phân trang
                totalStudents = await studentModel.getByPattern(search);
            } else {
                // du lieu đã phân trang
                students =await studentModel.all(page, item_per_page);
                
                // du lieu chưa phân trang
                totalStudents=await studentModel.all();
            }
            // console.log(students);
            // ceil la lam tron nha : tran nha
            // .length la dem so luong phan tu trong danh sach
            const totalPage =Math.ceil(totalStudents.length/ item_per_page);
            // console.log('test:', format(new Date(11, 1, 2014), 'dd-MM-yyyy' ))
            //  students = await studentModel.all();
            // console.log(students);
            const message_success= req.session.message_success;
            const message_error= req.session.message_error;
            // chủ động xóa message
            delete req.session.message_success;
            delete req.session.message_error;
            res.render('student/index',{
                students:students,
                format:format,
                search:search,
                totalPage:totalPage,
                page:page,
                module: this.module,
                message_success:message_success,
                message_error:message_error,
            });
            res.end();
        } catch(error){
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
    static create = (req,res)=>{
        try {
            res.render('student/create',{
                module: this.module
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static store = async (req,res)=>{
        try {
            // console.log(req.body);
            // luu du lieu vao database , trong req
            await studentModel.save(req.body);
// luu session vao req
            req.session.message_success = ` Đã tạo sinh vien ${req.body.name} thành công`

            // res.render('student/create');
            // dieu huong ve trang mong muon)
            res.redirect('/');
            // res.send(req.body);
            // res.end();
        } catch (error) {
            
            req.session.message_error =` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/');
        }
    }
    static edit = async (req,res)=>{
        const student = await studentModel.find(req.params.id);   
        // aaa
        try {
            res.render('student/edit',{
                student:student,
                module: this.module
            });
            
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static update = async (req,res)=>{
        try {
            const id = req.body.id;
            const name = req.body.name;
            const birthday = req.body.birthday;
            const gender = req.body.gender;
            // lay student tu database len
            const student= await studentModel.find(id);
            //cap nhat
            student.name =name;
            student.birthday =birthday;
            student.gender =gender;

            // luu no xuong database
            await student.update();
            // luu session vao req
            req.session.message_success = ` đã cap nhap sinh vien ${req.body.name} thanh cong`;
            // res.render('student/create');
            // dieu huong ve trang mong muon)
            res.redirect('/');
            // res.send(req.body);
            // res.end();
        } catch (error) {
            req.session.message_error =` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/');
        }
    }
    static destroy = async (req,res)=>{
        try {
            const student= await studentModel.find(req.params.id); // lay số 1 ở http://qlsv.com/edit/1 thì dung params
            // kiem tra sinh vien có đăng ký môn học chưa?. nếu đăng ký rồi thì không thể xóa
            // lay danh sach cua register cua sinh vien can xoa
            const registers = await registerModel.getbyStudentId(req.params.id);
            if(registers.length >0){
                // luu session vao req
                req.session.message_error = ` Sinh viên ${student.name} đã đăng ký ${registers.length} môn, không thể xóa`;
                res.redirect('/')
                return; 
            }
            // lay student tu database len
            
            await student.destroy();
            req.session.message_success = ` đã xóa sinh viên ${student.name} thành công`;
            res.redirect('/');
        } catch (error) {
            req.session.message_error =` ${error.message}`;
            res.redirect('/');
        }
    }
    
}
module.exports= StudentController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params