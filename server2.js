const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB server');
    } catch (err) {
        console.error('Error connecting to MongoDB server', err);
        process.exit(1);
    }
}
const { cakes } = require('./cakes');

// Define endpoint to serve the data
app.get('/api/cakes', (req, res) => {
    res.json(cakes);
});

app.get('/api/cakes', async (req, res) => {
    try {
        const db = client.db('CAKE_PROJECT');
        const collection = db.collection('cakes');
        const cakes = await collection.find({}).toArray();
        res.json(cakes);
    } catch (err) {
        console.error('Error retrieving cakes', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/insert', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');
        const result = await collection.insertOne(req.query);
        data={ status:true,message: "Inserted Successfully" };
    res.json(data);
    } catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "Insert Failed" };
    res.json(data);
    }
  });
  
/*app.get('/insert1', async function (req, res){
    try {
     
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
    const db = client.db('CAKE_PROJECT');
    const collection=db.collection('customer');
      const user = await collection.findOne(req.query);
    console.log(user);
    if(user){
      data={ status:true,message: "Logged in Successfully" };
      res.json(data);
  
    }
    }catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "Login failed" };
    res.json(data);
    }
  });*/
  app.get('/insert1', async function (req, res) {
    try {
        // Check if the path starts with "/admin"
        res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        if (/^admin/i.test(req.query.username)) {
            // If it starts with "/admin", check in the admin collection
            const db = client.db('CAKE_PROJECT');
            const collection = db.collection('admin');
            const user = await collection.findOne(req.query);
            
            if (user) {
                // Admin found
                const data = { status: true, message: "admin" };
                res.json(data);
            } else {
                // Admin not found
                const data = { status: false, message: "not admin" };
                res.json(data);
            }
        } else {
            // If not starting with "/admin", check in the customer collection
            const db = client.db('CAKE_PROJECT');
            const collection = db.collection('customer');
            const user = await collection.findOne({ username: req.body.username, password: req.body.password });
            
            if (user) {
                // Customer found
                const data = { status: true, message: "user" };
                res.json(data);
            } else {
                // Customer not found
                const data = { status: false, message: "not user" };
                res.json(data);
            }
        }
    } catch (err) {
        console.error('Error ', err);
        const data = { status: false, message: "Error processing login" };
        res.json(data);
    }
});


  app.get('/insert2', async function (req, res){
    try {
     console.log(req);
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
    const db = client.db('CAKE_PROJECT');
    const collection=db.collection('admin');
    const collection2=db.collection2('customer');
      const admin= await collection.findOne(req.query);
      const user = await collection2.findOne(req.query);
    console.log(user);
    if(user){
      data={ status:true,message: "Logged in Successfully" };
      res.json(data);
  
    }
    }catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "Login failed" };
    res.json(data);
    }
  });
  app.post('/api/checkout', async (req, res) => {
    try {
        const db = client.db('CAKE_PROJECT');
        const collection = db.collection('cart');
        
        // Assuming 'req.body.products' contains the cart data
        const products = req.body.products;

        // Update MongoDB with the cart data
        // (Use appropriate MongoDB update operations here)

        res.status(200).json({ success: true, message: 'Cart data updated successfully' });
    } catch (error) {
        console.error('Error updating cart data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.post('/api/login/user', async (req, res) => {
    const { username, password } = req.body;
    const db = client.db('CAKE_PROJECT');
    const collection = db.collection('customer');
    
    const user = await collection.findOne({ username, password });

    if (user) {
        // User found in customer collection, send success response
        res.json({ success: true, isAdmin: false });
    } else {
        // User not found in customer collection, send failure response
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint to handle login requests for admin users
app.post('/api/login/admin', async (req, res) => {
    const { username, password } = req.body;
    const db = client.db('CAKE_PROJECT');
    const collection = db.collection('admin');
    const admin = await collection.findOne({ username, password });

    if (admin) {
        // Admin found in admin collection, send success response
        res.json({ success: true, isAdmin: true });
    } else {
        // Admin not found in admin collection, send failure response
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

  app.get('/findAll', async function (req, res){
    try {
    res.setHeader('content-type','application/json')
    res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');		
        const result = await collection.find({},{name:1,_id:0,username:1,email:1,phone:1,password:1,gender:1}).toArray();
    data={ status:true,message: "Successfully find the docs",list:result };
    res.json(data);
    } catch (err) {
        console.error('Error', err);
        data={ status:false,message: "Failed find the docs"};
    res.json(data);
    }
  });
  app.get('/delete', async function (req, res){
    try {
		res.setHeader('content-type','application/json')
		res.setHeader("Access-Control-Allow-Origin","*");
        const db = client.db('CAKE_PROJECT');
        const collection=db.collection('customer');
        const result = await collection.deleteOne(req.query);
		if(result.deletedCount>0)
			data={ status:true,message: "deleted Successfully",noOfDoc:result.deletedCount };
		else
			data={ status:true,message: "No data found",noOfDoc:result.deletedCount };
		res.json(data);
    } catch (err) {
        console.error('Error ', err);
        data={ status:false,message: "delete action failed" };
		res.json(data);
    }
});

app.get('/update', async function (req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const db = client.db('CAKE_PROJECT');
        const collection = db.collection('customer');
        const filter = { email: req.query.email };

        const result = await collection.updateOne(filter, { $set: { password: req.query.password } });

        let data;
        if (result.modifiedCount > 0) {
            data = { status: true, message: "Updated Successfully", noOfDoc: result.modifiedCount };
        } else {
            data = { status: false, message: "No data found", noOfDoc: result.modifiedCount };
        }
        res.json(data);
    } catch (err) {
        console.error('Error ', err);
        const data = { status: false, message: "Update action failed" };
        res.json(data);
    }
});


process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    connect(); // Connect to MongoDB when the server starts
});
