const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');
const https = require('https');

let client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

export default async function handler(req, res) {
  client = await clientPromise;
  const collection = client.db('Building').collection('clients');
  const client = await collection.findOne({name: 'myclient1'});
  try {
    
  }
  catch (e) {
    console.error(e);
  }

  res.send(`Hello ${client.name}`);
};