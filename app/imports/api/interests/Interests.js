import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const interestsName = 'Interests';
/** Define a Mongo collection to hold the data. */
const Interests = new Mongo.Collection(interestsName);

/** Define a schema to specify the structure of each document in the collection. */
const InterestsSchema = new SimpleSchema({
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Interests.attachSchema(InterestsSchema);

/** Make the collection and schema available to other code. */
export { Interests, InterestsSchema, interestsName };
