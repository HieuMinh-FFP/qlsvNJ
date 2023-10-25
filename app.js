const express = require('express');// import modul
require('dotenv').config();
const app = express();
// moi them
const bodyParser = require('body-parser');
const session = require('express-session');
// phan them
const hostname = '127.0.0.1'
const port = 80;
// const ejsLayout = require('express-ejs-layouts');
const ejsLayout= require('express-ejs-layouts');
const path = require('path');
//chi dinh thu vien layout
app.use(ejsLayout);
// dung engine
app.set('views','./views');
// chi dinh view engine
app.set('view engine','ejs');

// dat truoc use rooter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'con ga dang an thoc',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
// require student
const studentRouter = require('./routers/StudentRouter');
const subjectRouter = require('./routers/SubjectRouter');
const registerRouter = require('./routers/RegisterRouter');
// console.log(path.join(__dirname,'public'));
// de gan css public
// chi dinh thu muc public chua file
app.use(express.static(path.join(__dirname,'public')))


app.use('/', studentRouter);
app.use('/subject', subjectRouter);
app.use('/register', registerRouter);


console.log(process.env.DB_NAME);
app.listen(port, hostname,() => {
  console.log(`Example app listening on port ${port}`)
  // console.log(session)
  console.log('bb');
});
