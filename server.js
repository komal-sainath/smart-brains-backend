const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
	client: 'pg',
	connection: {
	  host : process.env.DATABASE_URL,
	  ssl: true
	}
 });

const app = express();
app.use(bodyParser.json());
app.use(cors());

// const DATABASE_URL = process.env.DATABASE_URL
app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

/* 
/ --> res = this is working
/signin --> POST success/fail. Using post request because of password security. 
/register --> POST = new user return
/profile/:userID --> GET = user infor return
/image --> PUT --> updated user object

*/

// app.get('/', (req, res) => {
// 	 db.select('*').from('users')
// 	 .then(data => {res.json(data)})
// })

//this method is another method of calling parameters from other functions associated with the below function
app.get('/', (req, res) => { res.send('its working!')});
app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
})

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
})