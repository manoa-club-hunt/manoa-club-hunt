import { Meteor } from 'meteor/meteor';

const updateUserProfileMethod = 'UserProfiles.Update';

Meteor.methods({
  'UserProfiles.Update'({ email, firstName, lastName, picture, interests, clubs }) {
    const id = Meteor.user()._id;
    Meteor.users.update({ _id: id }, { $set: { email, firstName, lastName, picture, interests, clubs } });
  },
});

export { updateUserProfileMethod };
