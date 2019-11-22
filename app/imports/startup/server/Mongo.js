import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Club.js';
import { Interests } from '../../api/interests/Interests';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

const defaultClubs = JSON.parse(Assets.getText('uhclubs.json'));

/* eslint-disable no-console */

function addClubs(data) {
  console.log(`   Adding: ${data.clubName}`);
  Clubs.insert(data);
  data.interests.forEach(function (interest) {
        if (!(_.contains(_.pluck(Interests.find().fetch(), 'interest'), interest))) {
          Interests.insert({ interest: interest });
        }
  });
}

if (Clubs.find().count() === 0) {
  if (defaultClubs) {
    console.log('Creating default clubs.');
    defaultClubs.map(data => addClubs(data));
  }
}

function addUsers(data) {
  console.log(`   Adding: ${data.firstName} ${data.lastName}`);
  UserProfiles.insert(data);
  data.interests.forEach(function (interest) {
    if (!(_.contains(_.pluck(Interests.find().fetch(), 'interest'), interest))) {
      Interests.insert({ interest: interest });
    }
  });
}

if (UserProfiles.find().count() === 0) {
  if (Meteor.settings.defaultUserProfiles) {
    console.log('Creating default user profiles.');
    Meteor.settings.defaultUserProfiles.map(data => addUsers(data));
  }
}
