if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express()

const router = require('./routes/')
const errorHandlers = require('./middleware/errorHandlers')
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.use(errorHandlers)

app.listen(port, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`App is running on http://localhost/${port}`)
  }
})
