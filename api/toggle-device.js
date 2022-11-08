const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');
const https = require('https');

let client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

export default async function handler(req, res) {
  client = await clientPromise;
  const collection = client.db('Building').collection('clients');
  const clientInfo = await collection.findOne({name: 'myclient1'});

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: clientInfo.cert,
    key: clientInfo.key});

  const raw = JSON.stringify({
    "@type": "powerSwitchState",
    "switchState": "OFF"
  });

  const requestOptions = {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: raw,
    redirect: 'follow',
    agent: httpsAgent
  };

  try {
    await fetch(`https://${clientInfo.hostport}/smarthome/devices/hdm%3AHomeMaticIP%3A3014F711A00004953859E5E2/services/PowerSwitch/state`, requestOptions);
  }
  catch (e) {
    console.error(e);
  }

  res.send(`Hello ${clientInfo.name}`);
};