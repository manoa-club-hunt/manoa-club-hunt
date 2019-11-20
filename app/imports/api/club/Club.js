import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const clubsName = 'Clubs';
/** Define a Mongo collection to hold the data. */
const Clubs = new Mongo.Collection(clubsName);

/** Define a schema to specify the structure of each document in the collection. */
const ClubSchema = new SimpleSchema({
  clubName: String,
  interests: Array,
  'interests.$': String,
  contact: String,
  website: { type: String, defaultValue: '' },
  email: { type: String, defaultValue: '' },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Clubs.attachSchema(ClubSchema);

/** Make the collection and schema available to other code. */
export { Clubs, ClubSchema, clubsName };
