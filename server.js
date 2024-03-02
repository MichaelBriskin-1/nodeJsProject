const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
let port = 3000;
let dbUrl = 'mongodb+srv://michaelbriskin10:4upjf388@cluster0.25opv5f.mongodb.net/svshop'
db.connect(dbUrl).then(()=>console.log('db on'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('pages'))


app.get('/signup', (req, res) => (
    res.sendFile(__dirname + '/pages/signUp.html')
    ))

app.get('/product', (req, res) => (
    // TODO: fetch all products from db
    // load products into html
    res.sendFile(__dirname + '/pages/product.html')
    ))



app.get('/buy', (req, res) => (
    res.sendFile(__dirname + '/pages/buy.html')
    ))
    
    //סכמה של מוצרים
    
    const productSchema = new db.Schema({
        productName: String,
        productPrice: Number
    })
    
    //מודל ושם הקולקשן של מוצרים
    
    const productList = db.model('product', productSchema)


    let product1 = {
        productName: 'bread',
        productPrice: '15'
    };
    
    let product2 = {
        productName: 'milk',
        productPrice: '23'
    };
  
    let product3 = {
        productName: 'gum',
        productPrice: '3'
    };

  let arr = [product1, product2, product3];
  
  //insert products
//   productList.insertMany(arr);

//delete products
// productList.deleteMany({productPrice: {$gte:0}}).then(console.log('!'))

//סכמה של משתמש חדש
const userSchema = new db.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
   
})


// מודל ושם הקולקשן של משתמשים
const userList = db.model('users', userSchema);


// סכמה ומודל הזמנות
const orderSchema = new db.Schema({
    userName: String,
    products: Array,
    totalPrice: Number
})

const orderList = db.model('orders', orderSchema)

// הגדרת בקשת פוסט לפי הפץ' מהסקריפט
app.post('/signup', async (req, res) => {
console.log('im here');
let temp = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
}
// console.log(temp.userEmail);
let checkEmail = await userList.findOne({userEmail:req.body.userEmail})
// console.log(checkEmail);
if (checkEmail == null) {
    userList.insertMany(temp)
    return res.json('user added')
}

else{
    res.json('user not added')
}

})

app.post('/login', async (req, res) => {
    console.log('login')
    var temp = {
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    }
    
    var user = await userList.findOne({
        userEmail:req.body.userEmail,
        // userPassword:req.body.userPassword,
    })

    if (user == null) {
        console.log(user);
        res.json('user not found')
    } else {
        console.log('user found');
        res.json('user found');
    }
    
})

app.get('/getproducts', async (req, res ) =>{

  let products = await productList.find()
  console.log(products);
    res.json(products)
})




app.post('/orders', async (req, res) => {
    let addProduct = await orderList.insertMany(
        
    )
})


app.listen(port, () => {
    console.log(`server works on port ${port}`)
});