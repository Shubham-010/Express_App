const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Walground = require("./models/walground");
mongoose.connect(
  "mongodb://localhost:27017/wallStoreDB"
  // {
  //     useNewURLParser:true,
  //     useCreateIndex:true,
  //     useUnifiedTopology:true
  // }  
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //??
db.once("open", () => {
  console.log("Connection successful!!");
});

app.set("view engine", "ejs"); // ??
app.set("views", path.join(__dirname, "views")); // ??
app.use(express.urlencoded({extended:true}))
app.listen(3333, () => {
  console.log("Connected to 3333 success!!");
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/walgrounds", async (req, res) => {
  // adding seeds
  const walgrounds = await Walground.find({});
  res.render("walgrounds/index", { walgrounds });
});

app.get("/walgrounds/new", async (req, res) => {
  // const walgrounds = await Walground.findById(req.params.id);
  res.render("walgrounds/new");
});

app.post('/walgrounds',async(req,res)=>{
  const walgrounds = new Walground(req.body.walgrounds);
  await walgrounds.save();
  res.redirect(`/walgrounds/${walgrounds._id}`);
})

app.get("/walgrounds/:id", async (req, res) => {
  const walgrounds = await Walground.findById(req.params.id);
  res.render("walgrounds/show", { walgrounds });
});


// app.get('/makewalground', async(req,res)=>{
//     const wal = new Walground({
//         title:"Batman",
//         resolution:720,
//         Description:"Gotham city"
//     })
//     await wal.save();
//     res.send(wal)
// })
