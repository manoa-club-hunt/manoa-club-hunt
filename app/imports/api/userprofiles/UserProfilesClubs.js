import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const userProfilesClubsName = 'UserProfilesClubs';
/** Define a Mongo collection to hold the data. */
const UserProfilesClubs = new Mongo.Collection(userProfilesClubsName);

/** Define a schema to specify the structure of each document in the collection. */
const UserProfilesClubsSchema = new SimpleSchema({
  userProfile: String,
  club: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserProfilesClubs.attachSchema(UserProfilesClubsSchema);

/** Make the collection and schema available to other code. */
export { UserProfilesClubs, UserProfilesClubsSchema, userProfilesClubsName };
