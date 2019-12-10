import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Club';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';
import { Interests, interestsName } from '../../api/interests/Interests';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Clubs', function publish() {
  if (this.userId) {
    return Clubs.find();
  }
  return this.ready();
});

Meteor.publish(userProfilesName, function publish() {
  return UserProfiles.find();
});

Meteor.publish(interestsName, function publish() {
  return Interests.find();
});
