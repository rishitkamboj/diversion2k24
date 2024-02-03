const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://rishitkamboj24:ilovesis@cluster0.hlpepga.mongodb.net/HomeBizz')


const customer = new mongoose.Schema({
  
     name:String,  
       email:String,
     p_no:Number,
     pass:String
 });



const productSchema = new mongoose.Schema({
    p_name:String,
    p_price:Number,
    p_desc:String,
    img:String
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

 const User = mongoose.model('usercus', customer);

 module.exports={
     User,Product
 }
 