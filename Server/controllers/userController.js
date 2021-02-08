const {User} = require('../models/')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class userController {
  static register(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        msg: "Register complete",
        email: user.email
      })
    })
    .catch(err => {
      console.log(err)
      // res.status(400).json({msg: "Invalid input"})
      next(err)
    })
  }

  static login(req, res, next) {
    let newLogin = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({where:{
      email: req.body.email
    }})
    .then(user => {
      console.log(user)
      let comparePass = comparePassword(newLogin.password, user.password)
      if(comparePass) {
        // console.log("MASUK KE ACCESS TOKEN")

        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        // console.log(access_token, "THIS IS ACCESSTOKEN")
        res.status(200).json({access_token})
      } else {
        res.status(404).json({msg: "User not found"})
      }
    })
    .catch(err =>{
      console.log(err)
      next(err)
    })
  }

  static oAuthLogins(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
    let email = ""
    let password = String(Math.floor(Math.random() * 101010))
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email

      return User.findOne({where: {email}})
    })
    .then(user => {
      if(user) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        res.status(200).json({access_token})
      } else {
        return User.create({email, password})
        .then(user => {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          res.status(200).json({access_token})
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = userController;
