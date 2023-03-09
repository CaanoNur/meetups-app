import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://meetupuser:A9v1L7HogX3bCVyK@cluster0.er8uheu.mongodb.net/meetups_db?retryWrites=true&w=majority'
);

const db = client.db();

const meetupsCollection = db.collection('meetups');

const meetups = await meetupsCollection.find().toArray();

client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      id: meetup._id.toString(),
    })),
  },
    revalidate: 1,
  }; 
}

export default HomePage;
