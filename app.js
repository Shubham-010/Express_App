const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const Walground = require('./models/walground');
mongoose.connect('mongodb://localhost:27017/wallStoreDB',
// {
//     useNewURLParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// }
)

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));  //??
db.once("open",()=>{
    console.log("Connection successful!!");
})

app.set('view engine','ejs'); // ??
app.set('views',path.join(__dirname,'views')) // ??

app.listen(3333,()=>{
    console.log("Connected to 3333 success!!")
})

app.get('/',(req,res)=>{
    res.render('home')
})


app.get('/makewalground', async(req,res)=>{
    const wal = new Walground({
        title:"Batman",
        resolution:720,
        Description:"Gotham city"
    })
    await wal.save();
    res.send(wal)
})