import { Meteor } from 'meteor/meteor';

const updateUserProfileMethod = 'UserProfiles.Update';

Meteor.methods({
  'UserProfiles.Update'({ firstName, lastName, interests, clubs }) {
    const id = Meteor.user()._id;
    Meteor.users.update({ _id: id }, { $set: {
        profile: {
          firstName: firstName,
          lastName: lastName,
          interests: interests,
          clubs: clubs,
        },
    } });
  },
});

export { updateUserProfileMethod };
