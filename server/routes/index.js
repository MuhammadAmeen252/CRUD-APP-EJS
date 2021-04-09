const express = require('express')
const route = express.Router()
const indexController = require('../controller/index');

//renders
route.get('/', indexController.index)
route.get('/signup', indexController.signup)
route.get('/update',indexController.update)
route.get('/search',indexController.search)

//API routes
route.get('/users/search/:query',indexController.findUser)
route.post('/addUser',indexController.addUser)
route.get('/users/:id',indexController.getUser)
route.patch('/updateUser/:id',indexController.updateUser)
route.delete('/deleteUser/:id', indexController.deleteUser)
route.get('/users',indexController.getUsers)


module.exports = route