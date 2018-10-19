const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const { authenticate, createToken } = require('./middlewares.js');

const salt = 11;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const login = req.body;
  const hashedPW = bcrypt.hashSync(login.password, salt);
  login.password = hashedPW;

  db('users')
    .insert(login)
    .then(ids => {
      const id = ids[0];
      db('users')
        .where({id})
        .first()
        .then(user => {
          const token = createToken(user);
          res.status(201).json({id: user.id, token: token});
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function login(req, res) {
  const login = req.body;
  db('users')
    .where({username: login.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(login.password, user.password)){
        const token = createToken(user);
        res.status(200).json({token})
      } else {
        res.status(402).json({error:"error!"});
        console.log("oops");
      }
    })
    .catch(err => console.log(err))
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
