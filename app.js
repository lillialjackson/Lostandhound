const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});;


const app = express();



// middleware
app.use(bodyParser.json());
app.use(cors());



app.use(express.static('public'));
app.get('/', (req, res) => res.send('Dog Express'));


// POST request for form submissions

app.post('/register', (req, res) => {
  const {dogName, breed, age, ownerName, email, phone} =req.body;
  if (email === '' || ownerName === '' || dogName === '') {
    return res.status(400).json('incorrect form submission');
  }
  knex('dogs')
  .returning('*')
  .insert({
  dogname: dogName,
  breed: breed,
  age: age,
  ownername: ownerName,
  email: email,
  phone: phone
 })

  .then(response => {
  res.json(response);
})
.catch(err => {
  res.status(400).json('unable to join');
  })
})


// GET requests for database information upon search submission
app.get('/search', (req, res) => {
  const {searchDogName} = req.query;
  knex.select('email', 'ownername', 'phone', 'dogname').from('dogs')
    .where('dogname', '=', searchDogName)
    .then(dog => {
      return dog;
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json('cant fetch search results');
      })
})



app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})
