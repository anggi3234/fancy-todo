const {Todo} = require("../models")

const authorize = function(req, res, next) {
  let UserId = req.decoded.id
  console.log(UserId, "THIS IS THE USER ID")
  Todo.findOne({
    where: {
      UserId
    }
  })
  .then(todo => {
    console.log(todo, "THIS TO DO IS INSIDE AUTHORIZE")

    if(todo) {
      next()
    } else if(!todo) {
      res.status(404).json({ msg: "Todo list is empty"})
    } else {
      const error = err.msg || "Unauthorized user access"
      res.status(500).json({error})
    }
    if(!todo) {
      res.status(404).json({ msg: "Todo list is empty"})
    } else {
      next()
    }
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
}
module.exports = authorize
