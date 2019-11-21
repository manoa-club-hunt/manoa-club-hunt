import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/club/Club.js';
import { Interests } from '../../api/interests/Interests';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addClubs(data) {
  console.log(`   Adding: ${data.clubName}`);
  Clubs.insert(data);
  data.interests.forEach(function (interest) {
        if (!(_.contains(Interests.find().fetch(), interest))) {
          Interests.insert({ interest: interest });
        }
      });
}

if (Clubs.find().count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(data => addClubs(data));
  }
}

function addUsers(data) {
  console.log(`   Adding: ${data.firstName} ${data.lastName}`);
  UserProfiles.insert(data);
  data.interests.forEach(function (interest) {
    if (!(_.contains(Interests.find().fetch(), interest))) {
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
