const express = require('express');
const app = express();
const path = require('path'); 
const {User,Product}=require(path.join(__dirname, 'db'));

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
    res.sendFile('main.html', {root: path.join(__dirname, 'public')});
});
app.get('/home', (req, res) => {
    res.sendFile('home.html', {root: path.join(__dirname, 'public')}); 
});
app.get('/error', (req, res) => {
    res.sendFile('error.html', {root: path.join(__dirname, 'public/')});
});

app.get('/signup', (req, res) => {
    res.sendFile('signup.html', {root: path.join(__dirname, 'public/')});
});



app.get('/signin', (req, res) => {
    res.sendFile('signin.html', {root: path.join(__dirname, 'public/')});
});






// Define a new GET route to fetch product data from the database
app.get('/products', async (req, res) => {
    try {
        // Fetch product data from the database
        const products = await Product.find();

        // Send the product data as JSON to the frontend
        res.json(products);
    } catch (error) {
        // If an error occurs, log the error and send an error response
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.post('/signup', async (req, res) => {
    try {
       const n=req.body.Name;
       const em=req.body.Email
       const num=req.body.Mobile;
       const pass=req.body.PWord;

      

        // Attempt to create a new user
      
        const a=await User.findOne({ email: em})
        if (a) {
         
            res.send('<script>alert("User Already exists, login "); window.location.href = "/";</script>');
        }
        
    else{   await  User.create({
        name:n,  
        email:em,
      p_no:num,
      pass:pass
        })

        // Redirect the user to the home page after successful signup
        res.redirect('/');}
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signup:', error);
        // Redirect to the error page
        res.redirect('/error');
    }
});







app.post('/signin', async (req, res) => {
    try {
        const { Email, PWord } = req.body;

        // Look up the user in the database
        const user = await User.findOne({ email: Email, pass: PWord });

        if (user) {
            // User found, redirect to the mandala page
            res.redirect('/home')
        }
         else {
            // User not found, redirect to the error page
            res.redirect('/error');
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signin:', error);

        // Redirect to the error page
        res.redirect('/error');
    }
});



module.exports = app;