const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.use(authenticate)
router.post('/', todoController.add)
router.get('/', todoController.getTodo)
router.get('/books', todoController.searchBook)
router.get('/:id', authorize, todoController.findTodo)
router.put('/:id', authorize, todoController.editTodos)
router.patch('/:id', authorize, todoController.updateStatus)
router.delete('/:id', authorize, todoController.deleteTodo)

module.exports = router;
