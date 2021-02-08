const bcrypt = require('bcryptjs')

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, userpasswords) {
  // console.log("INSIDE BCRYPT")
  return bcrypt.compareSync(password, userpasswords)
}

module.exports = {hashPassword, comparePassword}
