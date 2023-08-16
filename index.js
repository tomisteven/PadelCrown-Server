
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');


dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    (err, res) => {
        if(err){
            throw err;
        }else{
            console.log("La conexion a la base de datos es correcta");
            app.listen(process.env.PORT || 8080, () => {
                console.log("#####################");
                console.log("##### API REST #####");
                console.log("#####################");
                console.log("PORT: " + process.env.PORT);
            });
        }
    }
)





/* const { MongoClient, ServerApiVersion } = require('mongodb');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Establish and verify connection
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch(e) {
    console.log("Error: " + e);
  }
}
run().catch(console.dir); */


