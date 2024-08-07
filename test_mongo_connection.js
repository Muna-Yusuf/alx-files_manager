const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '27017';
const dbName = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${host}:${port}`;
const client = new MongoClient(url, { useUnifiedTopology: true });

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('test');
    await collection.insertOne({ test: 'success' });
    const document = await collection.findOne({ test: 'success' });
    console.log('Document:', document);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await client.close();
  }
}

testConnection();

