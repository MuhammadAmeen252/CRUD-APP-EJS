const mongoose=require('mongoose')
const MONGODB_URL = 'mongodb://localhost:27017/UserDB'
mongoose.connect((MONGODB_URL),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}, (error) => {
    if(!error){
        console.log('Connected successfully!')
    }
    else{
        console.log('connection error: '+error)
    }
})