import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db('UrlCollectionDB');
        const collection = db.collection('Urls');

        const urls = await collection.find({}).toArray();

        return new Response(JSON.stringify(urls), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch URLs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}