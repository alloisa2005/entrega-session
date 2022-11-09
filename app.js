
const express = require('express')


const app = express()
const PORT = process.env.PORT || 8080;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {  
  res.render('home',{msg: 'Holaaaaa'});
})

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))