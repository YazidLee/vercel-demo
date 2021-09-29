// Import the dependency.
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
};
let client;
let clientPromise;
if (process.env.VERCEL_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (hot module replacement).
   if (!global._mongoClientPromise) {
      console.log("New connection")
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
      console.log("Set connection cache")
   }
   console.log("Using connection cache")
   clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  console.log("Production mode")
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
}
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
module.exports = clientPromise;