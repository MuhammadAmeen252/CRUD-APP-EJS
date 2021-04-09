const User = require('../model/user')
const axios = require('axios')

//EJS route render controllers
const index = (req, res, next) => {
    //make a get request to get all users
    axios.get('http://localhost:3000/users')
    .then(function(response){
        //console.log(response.data)
        res.render('index',{users : response.data})
    })
    .catch(e => {
        res.send(e)
    })
};
const signup = (req, res, next) => {
    res.render('signup', {});
};

const update = (req, res, next) => {
    //get user whose id is matching with params Id
    axios.get('http://localhost:3000/users/'+req.query.id)
    .then(function(userToUpdate){
        //console.log(userToUpdate)
        res.render('updateUser',{user: userToUpdate.data})
    })
};

const search = (req, res, next) => {
    axios.get('http://localhost:3000/users/search/'+req.query.searchQuery)
    .then(function(response){
        const data = response.data
        if(!data){
            data='No users to Display!'
        }
        res.render('index',{users : data})
    })
    .catch(e => {
        res.send(e)
    })
};

//API Route controllers
const addUser = async(req, res, next) => {
    if(!req.body){
        res.send('Fill all the fields')
    }
    else{
        const user=new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            gender: req.body.gender
        }) 
        //console.log(user)
        try{
            await user.save()
            //if await user.save runs then res is send otherwise it goes to catch block
            res.redirect('/signup')
           // res.status(201).send('Added user Successully!')
        }
        catch (e){
            res.status(404).send(e.message)
        }
    }
}

const updateUser = async(req,res) => {
    const updates = Object.keys(req.body)
    try{
        const id = req.params.id
        const user = await User.findById(id)
        //updates all the fields that are given in body by looping
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        // res.redirect('/')
        res.send('updated user successfully!')
        
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const deleteUser = async(req,res)=>{

    try{  
        const id = req.params.id
        const user = await User.findById(id)
        await user.remove()
        res.send(user)
    }
    catch(e){
        res.status(500).send(e.message)
    }

}

const getUser = async(req,res) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        res.send(user)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const getUsers = async(req,res) => {
    try{
        const user = await User.find()
        res.send(user)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const findUser = async(req,res) => {
    const query = req.params.query
    if(!query){
        return res.send('No users to Display')
    }
    try{
        const user = await User.find({'name':query})
        res.send(user)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}


module.exports = {
    index,
    addUser,
    signup,
    updateUser,
    deleteUser,
    getUsers,
    update,
    getUser,
    search,
    findUser
};