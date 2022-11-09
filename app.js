
const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./models/User.model')

const app = express()
const PORT = process.env.PORT || 8080;

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
  res.render('home',{msg: 'Holaaaaa'});
})

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))