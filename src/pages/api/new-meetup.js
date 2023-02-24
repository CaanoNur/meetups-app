import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req,res) {
    if (req.method === 'POST') {
       const data = req.body;

       const client = await MongoClient.connect(
           'mongodb+srv://meetupuser:A9v1L7HogX3bCVyK@cluster0.er8uheu.mongodb.net/meetups_db?retryWrites=true&w=majority'
       );

       const db = client.db();

       const meetupsCollection = db.collection('meetups');

       const result = await meetupsCollection.insertOne(data);

       console.log(result);

       client.close();

       res.status(201).json({ Message: 'Meetup inserted'});
    }
}

export default handler;