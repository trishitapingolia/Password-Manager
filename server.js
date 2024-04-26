import express from "express"
import { config as configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import pkg from "cors"
const app = express()
const port = 3000
configDotenv();
// console.log(process.env.MONGO_URI);  //CHECKING DOTENV

app.use(bodyParser.json())
app.use(pkg())

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'passwordManagerDB';


client.connect();
// get all the passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName)
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
  
})

// save a password

app.post('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName)
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})

// delete a password
app.delete('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName)
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})