import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName, interests, clubs, role) {
  console.log(`  Creating user: email->${email}, firstname->${firstName}, lastname->${lastName}.`);
  const userID = Accounts.createUser({
    username: email,
    password: password,
    email: email,
    profile: {
      firstName: firstName,
      lastName: lastName,
      interests: interests,
      clubs: clubs,
    },
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'officer') {
    Roles.addUsersToRoles(userID, 'officer');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(
        ({
           email, password, profile, role,
         }) => createUser(email, password, profile.firstName, profile.lastName, profile.interests, profile.clubs, role),
    );
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
