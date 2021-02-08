const errorHandlers = function(err, req, res, next) {
  // if(err.name === 'customError') {
  //   res.status(err.status).json(err.msg)
  //   // res.status(400).json({msg:'Email must Be Unique'})
  // } else {
  //   let error = err.errors[0].message
  //   res.status(500).json({error})
  // }
  console.log(err, "THIS IS THE ERROR")
  if(err.name === "SequelizeUniqueConstraintError") {
    // const errors = err.errors.map(el => el.message)
    res.status(400).json({
      err
    })
  } else if (err.name === "customError") {
    res.status(400).json(err.msg)
  } else {
    let error = err.errors[0].message
    res.status(500).json({error})
  }
}

module.exports = errorHandlers
