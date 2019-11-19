import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Clubs = new Mongo.Collection('Clubs');

const ClubSchema = new SimpleSchema({
  clubName: String,
  interests: Array,
  'interests.$': String,
  contact: String,
  website: { type: String, defaultValue: '' },
  email: { type: String, defaultValue: '' },
}, { tracker: Tracker });

Clubs.attachSchema(ClubSchema);

export { Clubs, ClubSchema };
