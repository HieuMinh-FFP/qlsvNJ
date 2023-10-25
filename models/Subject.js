const pool = require('./db');
const Base = require('./Base')
class Subject extends Base {
    // hàm xay dung doi tuong
    
    TABLE_NAME ='subject';
    SELECT_ALL_QUERY =` SELECT * FROM ${this.TABLE_NAME}`;
        convertArrayToObject = (row)=>{
            return  new Subject(row)
        }
            
    
    // ham lay tat ca cac dong du lieu trong bang:
    // tra ve danh sach chua cac doi tuong
     
    

    
     save = async (data) => {
        try {
            const [result] = await pool.execute('insert into subject value (?, ?, ?)', [null, data.name, data.number_of_credit]);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
    // tim mot thang subject
    
        
    
    update = async ()=>{
        try {
            const [result] = await pool.execute('update subject set name =?, number_of_credit=? where id =?',[this.name, this.number_of_credit, this.id]);
            return true;
        }catch(error){
            throw new Error(error)
        }

    }
    
}
module.exports = new Subject();