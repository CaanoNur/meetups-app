import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://meetupuser:A9v1L7HogX3bCVyK@cluster0.er8uheu.mongodb.net/meetups_db?retryWrites=true&w=majority'
    );

    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
    const db = client.db();

    const documents = await db.collection(collection).find(filter).sort(sort).toArray();

    return documents;
}