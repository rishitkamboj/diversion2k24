const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://rishitkamboj24:ilovesis@cluster0.hlpepga.mongodb.net/HomeBizz')


const userSchema = new mongoose.Schema({
     username:String, 
     password:String,
     name:String,
     p_no:Number,
    email:String,
     business_type:String,
     business_name:String,
     verify:Number
 });

 const formSchema = new mongoose.Schema({
   name:String,
   email:String,
   p_no:Number,
   sub:String,
   msg:String,
});


 const productSchema=new mongoose.Schema({

 });

const form=mongoose.model('forms',formSchema);
 const User = mongoose.model('users', userSchema);

 module.exports={
     User,form
 }
 