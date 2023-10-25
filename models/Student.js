const pool = require('./db');
const Base = require('./Base');


class Student extends Base {
    // hàm xay dung doi tuong
   
    TABLE_NAME ='student';
    SELECT_ALL_QUERY =` SELECT * FROM ${this.TABLE_NAME}`;
    
    
   convertArrayToObject = (row)=>{
       return  new Student(row)
   }
   // ham lay tat ca cac dong du lieu trong bang:
   // tra ve danh sach chua cac doi tuong
    save = async (data) => {
       try {
           const [result] = await pool.execute(`insert into ${this.TABLE_NAME} value (?, ?, ?, ?)`, [null, data.name, data.birthday, data.gender]);
           return result.insertId;
       } catch (error) {
           throw new Error(error);
       }
   }
   // tim mot thang student
    
   update = async ()=>{
       try {
           const [result] = await pool.execute(`update ${this.TABLE_NAME} set name =?, birthday=?,gender = ? where id =?`,[this.name, this.birthday, this.gender, this.id]);
           return true;
       }catch(error){
           throw new Error(error)
       }
   }
}
module.exports = new Student();