const pool = require('./db');
class Base{
    // data cua minh truyen vao la object, phai phan ra no ra thanh cac thuộc tính của đối tượng
    // vd :{ id:1, name :'Ty', birthday: '2000-11-16', gender:'nam'}
    //se phan ra , va chuyen no thanh
    // this.id =1;
    // this.name = 'Tý';
    // this.birthday ='2000-01-18';
    // this.gender ='nam';

    constructor(data){
        // keys  dang chua array các thuộc tinh ( cac cột trong bảng)
        const keys = data ? Object.keys(data): [];
        // forof
        for ( const key of keys){
            // this.id = data.id
            // this.name = data.name 
            //...
            this[key] = data[key];
        }
    }
    buildLimit = (page = null, item_per_page= null)=>{
        let limit ='';
        if(page && item_per_page){
            const row_index =(page -1)* item_per_page;
            limit =`LIMIT ${row_index}, ${item_per_page}`;
            // trang 1 : LIMIt 0,4
            // trang 2 : LIMIT 4,4
        }
        // console.log(limit);
        return limit;
            
    }
    all= async(page= null, item_per_page=null)=> {
        // console.log('page:',page);
        // console.log('item_per_page:',item_per_page);
        try {
            //xay dung phan trang 
        const limit = this.buildLimit(page, item_per_page);
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} ${limit} `);
            return this.convertArrayToObjects(rows);
        } catch (error) {
            throw new Error(error);
        }
    }
    getByPattern = async(search,page= null, item_per_page=null)=>{
        try {
            //xay dung phan trang 
            const limit = this.buildLimit(page, item_per_page);
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} where name like ? ${limit} `,[`%${search}%`]);
            // vd select * from subject where name like '%ty%'
            return this.convertArrayToObjects(rows);
        } catch (error) {
            throw new Error(error);
        }
    }
    find= async (id)=> {
        try {
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} where ${this.TABLE_NAME}.id = ?`,[id]);
            if(rows.length == 0){
                return null;
            }
            const row = rows[0];
            const object = this.convertArrayToObject(row);
            return object;

        } catch (error) {
           throw new Error(error)
        }
        
    }
    convertArrayToObjects = (rows)=>{
        const objects = rows.map(row => this.convertArrayToObject(row));
        return objects;
    }
    destroy = async ()=>{
        try {
            const [result] = await pool.execute(`delete from ${this.TABLE_NAME} where id =?`, [this.id]);
            return true;
        }catch(error){
            throw new Error(error)
        }

    }  
}
module.exports = Base;