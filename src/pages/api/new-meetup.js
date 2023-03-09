//import { MongoClient } from "mongodb";
import {connectDatabase, insertDocument} from '../../helpers/db-util';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req,res) {
    if (req.method === 'POST') {
       const data = req.body;

       // add data validation here

        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: 'Connecting to the database failed!'});
            return;
        }

        try {
            await insertDocument(client, 'meetups', data);
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!'});
            return;
        }

        res.status(201).json({ message: 'Meetup inserted'});
    }
}

export default handler;