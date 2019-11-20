import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { UserProfilesClubs } from '../../api/userprofiles/UserProfilesClubs';
import { UserProfilesInterests } from '../../api/userprofiles/UserProfilesInterests';

const updateUserProfileMethod = 'UserProfiles.update';

Meteor.methods({
  'UserProfiles.update'({ email, firstName, lastName, picture, interests, clubs }) {
    UserProfiles.update({ email }, { $set: { email, firstName, lastName, picture } });
    UserProfilesInterests.remove({ profile: email });
    UserProfilesClubs.remove({ profile: email });
    interests.map((interest) => UserProfilesInterests.insert({ profile: email, interest }));
    clubs.map((project) => UserProfilesClubs.insert({ profile: email, project }));
  },
});

export { updateUserProfileMethod };
