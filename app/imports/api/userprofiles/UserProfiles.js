import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const userProfilesName = 'UserProfiles';
/** Define a Mongo collection to hold the data. */
const UserProfiles = new Mongo.Collection(userProfilesName);

/** Define a schema to specify the structure of each document in the collection. */
const UserProfilesSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserProfiles.attachSchema(UserProfilesSchema);

/** Make the collection and schema available to other code. */
export { UserProfiles, UserProfilesSchema, userProfilesName };
