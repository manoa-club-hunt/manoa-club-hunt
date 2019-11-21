import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

const updateUserProfileMethod = 'UserProfiles.update';

Meteor.methods({
  'UserProfiles.update'({ email, firstName, lastName, picture, interests, clubs }) {
    UserProfiles.update({ email }, { $set: { email, firstName, lastName, picture, interests, clubs } });
  },
});

export { updateUserProfileMethod };
