const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
// simpleDBUser
// joTjPCfcS4Z7n76V
const uri = "mongodb+srv://simpleDBUser:joTjPCfcS4Z7n76V@cluster0.oeyfvq1.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is getting hot !");
})

async function run() {
    try {
        await client.connect('');

        const usersDB = client.db('userssDB');
        const usersCollection = usersDB.collection('users');

        // add database related apis here

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('user info ', newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your developed.Your successfully connected to MongoDB !");
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})