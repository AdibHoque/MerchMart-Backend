require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API server is running for MerchMart!")
})

app.listen(port, () => {
  console.log("Listening to Port: ", port)
})

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.knvnnno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // // Connect the client to the server(optional starting in v4.7)
    // await client.connect();
    const Collection = client.db('Merchmart').collection('Products');
    app.get("/products", async (req, res) => {
      const cursor = Collection.find();
      const result = await cursor.toArray();
      const total = await Collection.countDocuments()
      const data = { totalProducts: total, data: result }
      console.log(total)
      res.send(data);
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);