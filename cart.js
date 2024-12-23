const fs=require('fs');
const path=require('path');
const Cart=require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),'Dynamic Routes',
    'data',
    'cart.json'
  );
module.exports=class Cart{
   static addProduct(id,productPrice){
    //fetch the previous cart
    fs.readFile(p,(err,fileContent)=>{
        let cart ={products:[],totalPrice: 0};
        if(!err){
            cart=JSON.parse(fileContent);
        }
        //analyze the cart=> Find existing product
        const existingProductIndex=cart.products.findIndex(prod=>prodId===id);
        const existingProduct=cart.products[existingProductIndex];
        let updateProduct;
        //Add new product /increase quantity
        if(existingProduct){
            updateProduct={ ...existingProduct};
            updateProduct.qty=updateProduct.qty+1;
            cart.products=[...cart.products];
            cart.products[existingProductIndex]=updateProduct;
        }else{
            updateProduct={ id:id ,qty:1 };
            cart.products=[...cart.products,updateProduct];
        }
        cart.totalPrice=cart.totalPrice+ +productPrice;
        fs.writeFile(p,JSON.stringify(cart),(err) =>{
            console.log(err);
        })
        
    })
   }
 
   static deleteProduct(id,productPrice){
    fs.readFile(p,(err,fileContent)=>{
        let cart ={products:[],totalPrice: 0};
        if(!err){
            cart=JSON.parse(fileContent);
        }
        //analyze the cart=> Find existing product
        const updatedCart={...fileContent};
        const product=updatedCart.products.find(prod=>prod.id===id);
        const productQty=product.qty;
        updatedCart.products=updatedCart.products.filter(prod=> prod.id===id);
        updatedCart.totalPrice=updatedCart.totalPrice- productPrice*productQty;

        fs.writeFile(p,JSON.stringify(updatedCart),(err) =>{
                    console.log(err);
                })
        
    })
   }
}