const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//we establish connection with db
require('./server/db/mongoose')

//log requests
app.use(morgan('tiny'))

//parse request to body parser
app.use(bodyParser.urlencoded({extended: true}))

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs")

//load assets in public folder
app.use('/css', express.static(path.resolve(__dirname,'public/css')))
app.use('/img', express.static(path.resolve(__dirname,"public/img")))
app.use('/js', express.static(path.resolve(__dirname,"public/js")))

//load routes
app.use('/',require('./server/routes/index'))


 app.listen(PORT, () => console.log('server is on port : '+PORT))