const express = require('express');
const app = express();
const path = require('path'); 
const {User,form}=require(path.join(__dirname, 'db'));


// const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT || 3000);




app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/', (req, res) => {
    res.sendFile('home.html', {root: path.join(__dirname, 'public')});
});
app.get('/home', (req, res) => {
    res.sendFile('home.html', {root: path.join(__dirname, 'public')}); 
});
app.get('/error', (req, res) => {
    res.sendFile('error.html', {root: path.join(__dirname, 'public/')});
});

app.get('/pricing', (req, res) => {
    res.sendFile('pricing.html', {root: path.join(__dirname, 'public/')});
});

app.get('/about', (req, res) => {
    res.sendFile('about.html', {root: path.join(__dirname, 'public/')});
});

app.get('/contactus', (req, res) => {
    res.sendFile('contactus.html', {root: path.join(__dirname, 'public/')});
});

app.get('/form', (req, res) => {
    res.sendFile('form.html', {root: path.join(__dirname, 'public/')});
});
app.get('/signin', (req, res) => {
    res.sendFile('signin.html', {root: path.join(__dirname, 'public/')});
});

app.get('/signup', (req, res) => {
    res.sendFile('signup.html', {root: path.join(__dirname, 'public/')});
});

app.get('/addproduct', (req, res) => {
    res.sendFile('addproduct.html', {root: path.join(__dirname, 'public/')});
});




app.post('/signup', async (req, res) => {
    try {
        const { Username, Bname, PhNo, Email, 'address-l1': address1, 'address-l2': address2, 'address-l3': address3, 'address-l4': address4, 'pincode': address5, BizType, GSTIN, Aadhar, u, PWord } = req.body;

        // Attempt to create a new user
      
        const a=await User.findOne({ email: Email})
        if (a) {
         
            res.send('<script>alert("User Already exists, login "); window.location.href = "/home";</script>');
        }
        
    else{   await  User.create({
            username: u,
            password: PWord,
             name: Username,
            p_no: PhNo,
            email: Email,
             business_type: BizType,
             business_name: Bname,
             verify:1
        })

        // Redirect the user to the home page after successful signup
        res.redirect('/home');}
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signup:', error);
        // Redirect to the error page
        res.redirect('/error');
    }
});





app.post('/form', async (req, res) => {
    try {
        const {fullname,email, phone,subject,message } = req.body;

        // Attempt to create a new user
         await  form.create({
            name:fullname,
            email:email,
            p_no:phone,
            sub:subject,
            msg:message
        })

        // Redirect the user to the home page after successful signup
        res.redirect('/home');}
    catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signup:', error);
        // Redirect to the error page
        res.redirect('/error');
    }
});





app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Look up the user in the database
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            // User found, redirect to the mandala page
            if(user.verify==1){
                res.send('<script>alert("Your account is awaiting verification. Please allow some time for the verification process to complete."); window.location.href = "/home";</script>');
            }
           else if (user.verify === 2) {
                        res.redirect('/addproduct');
                       }
         else {
            // User not found, redirect to the error page
            res.redirect('/error');
        }}
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signin:', error);

        // Redirect to the error page
        res.redirect('/error');
    }
});









module.exports = app;