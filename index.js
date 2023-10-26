const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// mdmomenulislam1
// cPcchE6Kz9Tgw7l3


const uri = "mongodb+srv://mdmomenulislam1:cPcchE6Kz9Tgw7l3@cluster0.dzivggu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const productCollection = client.db("productDB").collection("products");

    // const brandCollection = collection("brandData")

    const db = client.db('brandName');
    const collection = db.collection('brandData');

    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log("product", product);
      const result = await productCollection.insertOne(product);
      console.log(result);
      res.send(result);
    });

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      
      const filter = {
        _id: new ObjectId(id),
      };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          productName: data.productName,
          productImage: data.productImage,
          brandName: data.brandName,
          productType: data.productType,
          productPrice: data.productPrice,
          productShortDescription: data.productShortDescription,
          productFullDescription: data.productFullDescription,
          productRating: data.productRating
        },
      };
      const result = await productCollection.updateOne(filter, updatedData,options) ;
      res.send(result);
    })

    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      console.log(result);
      res.send(result);
    })

    app.get("/brands", async (req, res) => {
      const result = await collection.find().toArray();
      console.log(result);
      res.send(result);
    })


    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await productCollection.findOne(query);
      console.log(result);
      res.send(result)
    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Food Maker is running')
});

// app.get('/getData', async (req, res) => {
//   const db = client.db('productDB');
//   const collection = db.collection('brandData');

//   try {
//       const data = await collection.find({}).toArray();
//       res.json(data);
//   } catch (error) {
//       console.error('Error retrieving data from MongoDB:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(port, () => {
  console.log(`Food server is running on port: ${port}`)
})