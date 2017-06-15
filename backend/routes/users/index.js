var express = require('express');
var router = express.Router();

const validate = require('indicative');
const UserAPI = require('./class.UserAPI.js');

module.exports = router
  .get('/', (req, res) => {
    UserAPI.getUsers((response) => {
      return res.status(response.status).json(response.data).end();
    });
  })
  .post('/profile', (req, res) => {
    UserAPI.getMe(req.session.userID, (response) => {
      return res.status(response.status).json(response.data).end();
    });
  })
  .post('/username', (req, res) => {
    UserAPI.checkUsername(req.body.username, (response) => {
      if (response && response.status === 200) return res.status(400).json(`username is unavailable`).end();
      else if (response && response.status === 204) return res.status(200).end();
      else return res.status(500).end();
    });
  })
  .post('/', (req, res) => {
    let pattern = {
      ePersonID: 'required',
      username: 'required|string|min:6|max:20',
      password: 'required|string|min:6|max:20',
      aUserEmail: 'email'
    }
    validate.validate(req.body, pattern).then((userData) => {
      UserAPI.createUser(userData, req.session, (response) => {
        return res.status(response.status).json(response.data).end();
      });
    }).catch((errors) => {
      console.error(errors);
      return res.status(400).json(errors).end();
    });
  })
  .post('/login', (req, res) => {
    /**
     * @desc This method authentificates user
     * @method Authentificate user by username and password
     * @param {object} UserCredentials {username & password}
     * if success
     * @return {number} status(200) & set session cookie (token)
     * else
     * @return {number} status(400) - message(invalid password)
     * else
     * @return {number} status(400) - messages
     * else
     * @return {number} status(500) - error
     */
    const pattern = {
      username: 'required|string|min:6|max:20|alpha_numeric',
      password: 'required|string|min:6|max:20'
    }
    validate.validate(req.body, pattern).then((UserCredentials) => {
      UserAPI.authentificateUser(UserCredentials, (response) => {
        if (response && response.status === 201) return res.status(response.status).cookie('session', response.data).end();
        else return res.status(response.status).json(response.data).end();
      });
    }).catch((errors) => {
      console.error(errors);
      return res.status(400).json(errors).end();
    });
  })
  .post('/logout', (req, res) => {
    UserAPI.logOut(req.session.sessionID, (response) => {
      return res.status(response.status).json(response.data).end();
    });
  });