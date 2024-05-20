const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const waldata = require("./waldata");
const { descriptors, places } = require("./seedHelpers");
const Walground = require("../models/walground");

mongoose.connect(
  "mongodb://localhost:27017/wallStoreDB"
  // {
  //     useNewURLParser:true,
  //     useCreateIndex:true,
  //     useUnifiedTopology:true
  // }
);
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //??
db.once("open", () => {
  console.log("Connection successful!!");
});

const seedDb = async () => {
  await Walground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const newData = new Walground({
      Description: `${waldata[random1000].author},${waldata[random1000].filename}`,
      title: `${sample(descriptors)},${sample(places)}`,
    });
    await newData.save();
  }
};
seedDb().then(() => {
  mongoose.connection.close();
});
