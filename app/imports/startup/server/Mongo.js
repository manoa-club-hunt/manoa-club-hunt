import { Meteor } from 'meteor/meteor';
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

function addData1(data) {
  console.log(`   Adding: ${data.clubName}`);
  Clubs.insert(data);
}

if (Clubs.find().count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(data => addData1(data));
  }
}

function addInterests(data) {
  console.log(`   Adding: ${data.interest}`);
  Interests.insert(data);
}

if (Clubs.find().count() === 0) {
  if (Meteor.settings.default) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(data => addInterests(data));
  }
}

function addUsers(data) {
  console.log(`   Adding: ${data.firstName} ${data.lastName}`);
  UserProfiles.insert(data);
}

if (UserProfiles.find().count() === 0) {
  if (Meteor.settings.default) {
    console.log('Creating default user profiles.');
    Meteor.settings.defaultUserProfiles.map(data => addUsers(data));
  }
}
