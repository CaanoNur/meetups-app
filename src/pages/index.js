// import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { connectDatabase, getAllDocuments} from '../helpers/db-util';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {

  const client = await connectDatabase();
   
  const meetups = await getAllDocuments(client, 'meetups', {_id: -1}, {});
  // onst meetups = await getAllDocuments(client, 'meetups', {_id: -1}, {title: "Vaasan tori!""});

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
