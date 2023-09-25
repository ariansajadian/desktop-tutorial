const {schemaValidate} = require('../model/users')
const {Validate} = require('../service/inputService')
const {db} = require('../data/MYSQL')
const {v4 : uuidv4} = require('uuid')
const router = require('../routes/userRouter')

const createProduct = async (req,res) => {
    const body = req?.body;
    const request = ["title","detail","img","price","category_id"]
    const validation = await Validate(body,request)
    if(!validation.res) {
        res.json({  
          "data": null,
          "message": "required"
        })
    } else {
        // find product
     let InsertProduct = `INSERT INTO products (title, detail, img,price, category_id)
        VALUES ('${body?.title}','${body?.detail}','${body?.img}',${body?.price},${body?.category_id})`;         
        
        db.query(InsertProduct,(err,result) => {
            db.query(`SELECT * FROM products WHERE id = ${result.insertId}`, (err,result) => {
                res.json({message: result})
            })
        })  
    }
}


const productUpdate =  async (req,res) => {      
    const body = req?.body  
    const query = req?.query;
    const request = ["detail","price"]
    const validation = await Validate (body,request)
   if(!validation?.res) {
     res.json({
       "data": null,
       "message": "required"
     }) 
     
    } else {
        //find product by params
        
        let findProduct = `SELECT * FROM products Where title = '${query.title}'`;
        db.query(findProduct, (err, result) => {
          if (!result?.length >= 1) {
            res.json({ 
              "data": result,
              "message": "not found"  
            });
          } else {
            let productUpdate = `UPDATE products SET detail = '${body?.detail}', price = ${body?.price} Where id = '${result[0].id}'`;
            db.query(productUpdate, (err, result) => {
                res.status(200).json({
                  "data": null,
                  "message": "product Updated Succsessfully."
                });
            });
          }
      });
    }
}

const productList = async(req,res) => {
   
  // filter by product categories
    let productcategories 
    const productCategorie = req?.query.category_id;  
    if(productCategorie) {   
      db.query(`SELECT * FROM products Where category_id = '${productCategorie}'`, (err,result) => {    
       productcategories = result.map(element => {
            return  element.title
            });
          res.status(200).json({title:productcategories})
        }) 
  } else {
    db.query(`SELECT * FROM products`, (err,result) => {
      res.status(200).json({data: result, message: "Success"})
    })
  }   
}

const deleteProduct = async (req,res) => {
  const params = req?.params;
    db.query(`DELETE  FROM products WHERE id = '${params.id}'`, (err,result) => {
        if (!result.length >= 1) res.status(400).json({message: "not found"});
        res.json({message: "Success"})
    })
}

module.exports = {
  createProduct,
  productUpdate,
  productList,
  deleteProduct
}