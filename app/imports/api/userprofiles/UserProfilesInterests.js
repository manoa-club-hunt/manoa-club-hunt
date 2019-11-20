import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const userProfilesInterestsName = 'UserProfilesInterests';
/** Define a Mongo collection to hold the data. */
const UserProfilesInterests = new Mongo.Collection(userProfilesInterestsName);

/** Define a schema to specify the structure of each document in the collection. */
const UserProfilesInterestsSchema = new SimpleSchema({
  userProfile: String,
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserProfilesInterests.attachSchema(UserProfilesInterestsSchema);

/** Make the collection and schema available to other code. */
export { UserProfilesInterests, UserProfilesInterestsSchema, userProfilesInterestsName };
