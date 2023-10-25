const session = require('express-session');
const subjectModel = require('../models/Subject');
const RegisterModel = require('../models/Register');

const { format } =require('date-fns');
// const subjectModel = require('../models/Subject');
class SubjectController{

    //SubjectController
    static module = 'subject';
   static index = async(req,res) =>{
        try{

            const search = req.query.search;
            const page =Number(req.query.page || 1) ;
            const item_per_page = process.env.ITEM_PER_PAGE;
             // goi model de lay du lieu
            // goi tu class, khong can phai new subject()
            let subjects = [];
            let totalSubjects = [];
            if (search) {
                // du lieu đã phân trang
                subjects =await subjectModel.getByPattern(search, page, item_per_page);
                // du lieu chưa phân trang
                totalSubjects = await subjectModel.getByPattern(search);
            } else {
                // du lieu đã phân trang
                subjects =await subjectModel.all(page, item_per_page);
                // du lieu chưa phân trang
                totalSubjects=await subjectModel.all();
            }
            // ceil la lam tron nha : tran nha
            // .length la dem so luong phan tu trong danh sach
            const totalPage =Math.ceil(totalSubjects.length/ item_per_page);
            // console.log('test:', format(new Date(11, 1, 2014), 'dd-MM-yyyy' ))
            //  subjects = await subjectModel.all();
            // console.log(subjects);
            const message_success= req.session.message_success;
            const message_error= req.session.message_error;
            // chủ động xóa message
            delete req.session.message_success;
            delete req.session.message_error;
            res.render('subject/index',{
                subjects:subjects,
                format:format,
                search:search,
                totalPage:totalPage,
                page:page,
                message_success:message_success,
                message_error:message_error,
                module:this.module,
            });
            res.end();
        } catch(error){
            // subjects.forEach((subject,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
    static create = (req,res)=>{
        try {
            res.render('subject/create',{
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
            await subjectModel.save(req.body);
// luu session vao req
            req.session.message_success = ` đã tạo môn học ${req.body.name} thanh cong`

            // res.render('subject/create');
            // dieu huong ve trang mong muon)
            res.redirect('/subject');
            // res.send(req.body);
            // res.end();
        } catch (error) {
            
            req.session.message_error =` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/subject');
        }
    }
    static edit = async (req,res)=>{
        const subject = await subjectModel.find(req.params.id);   
        // aaa
        try {
            res.render('subject/edit',{
                subject:subject,
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
            const number_of_credit = req.body.number_of_credit;
            // lay subject tu database len
            const subject= await subjectModel.find(id);
            //cap nhat
            subject.name =name;
            subject.number_of_credit =number_of_credit;

            // luu no xuong database
            await subject.update();
            // luu session vao req
            req.session.message_success = ` đã cập nhật môn học ${req.body.name} thanh cong`;
            // res.render('subject/create');
            // dieu huong ve trang mong muon)
            res.redirect('/subject');
            // res.send(req.body);
            // res.end();
        } catch (error) {
            req.session.message_error =` ${error.message}`;
            // dieu huong ve trang mong muon)
            res.redirect('/subject');
        }
    }
    static destroy = async (req,res)=>{
        try {
            
            // lay subject tu database len
            const subject= await subjectModel.find(req.params.id); // lay số 1 ở http://qlsv.com/edit/1 thì dung params
            const registers = await RegisterModel.getbySubjectId(req.params.id);
            if( registers.length >0){
                req.session.message_error = `  môn học ${subject.name}  đã  gồm ${registers.length} sinh viên đăng ký không thể xóa`;
                res.redirect('/subject')
                return;
            }
            await subject.destroy();
            req.session.message_success = ` đã xóa môn học ${subject.name} thành công`;
            res.redirect('/subject');
        } catch (error) {
            req.session.message_error =` ${error.message}`;
            res.redirect('/subject');
        }
    }
    
}
module.exports= SubjectController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params