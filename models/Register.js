const pool = require('./db');
const Base = require('./Base');

class Register extends Base{
    // hàm xay dung doi tuong
   constructor(data){
    super(data);
    this.score = this.score !=null ? this.score.toFixed(2): null
   }
    TABLE_NAME ='register';
     SELECT_ALL_QUERY = `select ${this.TABLE_NAME}.*, student.name as student_name, subject.name as subject_name from ${this.TABLE_NAME} join student on ${this.TABLE_NAME}.student_id= student.id
    join subject on ${this.TABLE_NAME}.subject_id = subject.id`;
     
    convertArrayToObject = (row)=>{
        return  new Register(row)
        // row.id, row.student_id, row.subject_id, 
        //     row.score !=null ? row.score.toFixed(2): null, row.student_name, row.subject_name
    }
     
    // ham lay tat ca cac dong du lieu trong bang:
    // tra ve danh sach chua cac doi tuong
     
    
      getByPattern = async(search,page= null, item_per_page=null)=>{
        try {
            //xay dung phan trang 
            const limit = this.buildLimit(page, item_per_page);
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} where student.name like ? or subject.name like ?  ${limit} `,[`%${search}%`, `%${search}%`]);
            // vd select * from register join...  where student.name like '%ty%' or subject.name like'%ty%'
            return this.convertArrayToObjects(rows);
        } catch (error) {
            throw new Error(error);
        }
    }

    
     save = async (data) => {
        try {
            const [result] = await pool.execute('insert into register value (?, ?, ?, ?)', [null, data.student_id, data.subject_id, null]);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
    // tim mot thang register
     
    update = async ()=>{
        // console.log(this);
        try {
            const [result] = await pool.execute('update register set score =? where id =?',[this.score, this.id]);
            return true;
        }catch(error){
            throw new Error(error)
        }

    }
     
      getbyStudentId = async(student_id,page= null, item_per_page=null)=>{
        try {
            //xay dung phan trang 
            const limit = this.buildLimit(page, item_per_page);
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} where student_id = ?${limit} `,[student_id]);
            // vd select * from register join where student_id = 3;
            return this.convertArrayToObjects(rows);
        } catch (error) {
            throw new Error(error);
        }
    } 
      getbySubjectId = async(subject_id,page= null, item_per_page=null)=>{
        try {
            //xay dung phan trang 
            const limit = this.buildLimit(page, item_per_page);
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} where subject_id = ?${limit} `,[subject_id]);
            // vd select * from register join where student_id = 3;
            return this.convertArrayToObjects(rows);
        } catch (error) {
            throw new Error(error);
        }
    } 
    
}
module.exports = new Register();