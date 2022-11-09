
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const UserModel = require('./models/User.model')

const app = express()
const PORT = process.env.PORT || 8080;

app.use(session({
  key: 'user_uid',
  secret: 'mi secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//////// Conexión MONGO DB ////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/aae-sessions', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then( res => console.log('Base de datos conectada!!'))
///////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {      
  res.render('home');
})

app.get('/dashboard', (req, res) => {  
  res.render('dashboard');
})

app.get('/register', (req, res) => {  
  res.render('register');
})

app.get('/login', (req, res) => {  
  res.render('login');
})

app.get('/register', (req, res) => {  
  res.render('logout');
})

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))