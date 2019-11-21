import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

const updateUserProfileMethod = 'UserProfiles.Update';

Meteor.methods({
  'UserProfiles.Update'({ email, firstName, lastName, picture, interests, clubs }) {
    UserProfiles.update({ email }, { $set: { email, firstName, lastName, picture, interests, clubs } });
  },
});

export { updateUserProfileMethod };
