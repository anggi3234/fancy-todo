const { Todo } = require('../models/')
const axios = require('axios');

class todoController {
  static add(req, res){
    let newtask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(newtask)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static getTodo(req, res) {
    Todo.findAll({where: {UserId: req.decoded.id}})
    .then(todo => {
      console.log(todo, "THIS IS THE TODO")
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    })
  }
  static findTodo(req, res) {
    Todo.findByPk(req.params.id)
    .then(todo => {
      if(!todo) {
        res.status(404).json({
          msg: 'Todo tidak ditemukan'
        })
      } else {
        res.status(200).json(todo)
      }
    })
    .catch(err => {
      res,status(500).json({msg: "Error Not Found"})
    })
  }
  static editTodos(req, res) {
    let editTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(editTodo, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then(todo => {
      console.log(todo, "<<< THIS IS TODO")
      // if(!editTodo) {
      //   res.status(404).json({msg: "Todo Not found"})
      // } else {
        res.status(200).json(todo)
      // }
    })
    .catch(err => {
      res.status(500).json({msg: "Internal Server Error"})
    })
  }
  static updateStatus(req, res) {
    Todo.update({status: req.body.status}, {
      where: {
        id: +req.params.id
      }, returning: true
    })
    .then(todo => {
      // if(!todo) {
      //   res.status(404).json({msg: "Todo Status not found"})
      // } else {
        res.status(200).json(todo)
      // }
    })
    .catch(err => {
      if(err.name === "SequelizeValidationError") {
        res.status(400).json(err.message)
      } else {
        res.status(500).json({msg: "Internal Server Error"})
      }
    })
  }
  static deleteTodo(req, res) {
    Todo.destroy({where:{id: +req.params.id}})
    .then(todo => {
      if(!todo) {
        res.status(404).json({msg: "Error not found"})
      } else {
        res.status(200).json({msg: "Todo Success to Delete"})
      }
    })
    .catch(err =>{
      res.status(500).json({msg: "Internal Server Error"})
    })
  }

  static searchBook(req, res) {
    axios.get("https://fakerapi.it/api/v1/books?_quantity=2")
    .then(books => {
      res.json(books.data)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }
}

module.exports = todoController
