
const {db} = require('./MYSQL')

const getData = async (table) => {
 const searching = await db.query(`SELECT * FROM ${table} `);
        
    if(!searching?.length >= 1) {
        return {res:true}
    } else {
       return{res:false}
 
    }
} 

module.exports = {
    getData
}