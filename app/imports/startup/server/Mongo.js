import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Club.js';
import { Interests } from '../../api/interests/Interests';

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

