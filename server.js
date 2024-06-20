const express = require('express')
const mongoose = require('mongoose');
const Post = require('./model/post.schema');
const User = require('./model/user.schema');

const app = express()
app.use(express.json());
const Port = 5000


mongoose.connect('mongodb+srv://ridha:ridha@cluster0.wnxpawm.mongodb.net/')
.then(()=> console.log("Database connected !"))
.catch((err)=> console.log('err', err))





app.get('/' , (req,res)=> {
    res.send('hello there')
})


app.post('/add-user' , (req,res) => {
    const userObj = {
        firstName : 'Foulen - 1',
        lastName : 'Falten -1' ,
        age : 50
    }

    const userToAdd = new User(userObj)

    userToAdd.save()
    .then(() => res.status(200).json('User created successfully!'))
    .catch((err) => {
        console.log('err', err);
        res.status(500).json('Error creating user');
    });
})

app.put('/update-user/:id' , (req,res) => {
    const userObj = {
        firstName : 'Foulen - 2',
        lastName : 'Falten -2' ,
        age : 50
    }

    User.updateOne({_id: req.params.id}, userObj )
    .then(() => res.status(200).json('User updated successfully!'))
    .catch((err) => {
        console.log('err', err);
        res.status(500).json('Error update user');
    });
})

app.delete('/delete-user/:user_id',(req,res)=>{
    User.deleteOne({_id:req.params.user_id})
    .then(() => res.status(200).json('User deleted successfully!'))
    .catch((err) => {
        console.log('err', err);
        res.status(500).json('Error delete user');
    });
}
)


app.post('/add-post' , (req,res) => {
   
    const newPost = req.body

     postToAdd = new Post(newPost)

    postToAdd.save()
    .then(() => res.status(200).json('Post created successfully!'))
    .catch((err) => {
        console.log('err', err);
        res.status(500).json('Error creating post');
    }); 
})

app.listen(Port , (err)=>{
    err ? console.log('err', err) : console.log(`Server Running on ${Port}`)
})