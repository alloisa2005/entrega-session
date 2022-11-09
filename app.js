
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const UserModel = require('./models/User.model')

const app = express()
const PORT = process.env.PORT || 8080;
const mongoUri = 'mongodb://localhost:27017/aae-sessions';

///////////////// Conexión MONGO DB /////////////////////////////////
mongoose.connect(mongoUri, {
  useNewUrlParser: true,   
  useUnifiedTopology: true
}).then( res => console.log('Base de datos conectada!!'))
/////////////////////////////////////////////////////////////////////
const store = new MongoDBSession({
  uri: mongoUri,
  collection: 'mySessions'
})

app.use(session({  
  secret: 'mi palabra secreta',
  resave: false,
  saveUninitialized: false,  
  store: store,
  cookie: { maxAge: 60000 }
}))

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {     
  res.redirect('/login');  
})

app.get('/dashboard', (req, res) => {  
  res.render('dashboard');
})

app.get('/register', (req, res) => {  
  res.render('register',{msg_error:''});
})

app.get('/login', (req, res) => {  
  res.render('login');
})


app.get('/register', (req, res) => {  
  res.render('logout');
})

app.post('/register', async (req, res) => {  
  let { email } = req.body;
  let user = await UserModel.findOne({ email})

  if(!user){
    let newUser = await UserModel.create(req.body);
    await newUser.save();
    res.render('login')
  }else{
    res.render('register', {msg_error: 'Usuario ya existe'})
  }
})

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))