import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {

  render() {
    let userInterests = '';
    let userClubs = '';
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      if (i === Meteor.user().profile.interests.length - 1) {
        userInterests += Meteor.user().profile.interests[i];
      } else {
        userInterests += `${Meteor.user().profile.interests[i]}, `;
      }
    }
    for (let i = 0; i < Meteor.user().profile.clubs.length; i++) {
      if (i === Meteor.user().profile.clubs.length - 1) {
        userClubs += Meteor.user().profile.clubs[i];
      } else {
        userClubs += `${Meteor.user().profile.clubs[i]}, `;
      }
    }
    if (userClubs === '') {
      userClubs += 'No clubs listed.';
    }
    if (userInterests === '') {
      userInterests += 'No interests listed.';
    }
    return (
        <Card centered className="userprofile card">
          <Card.Content>
            <Card.Header className="userprofile card header">
              Your Profile
            </Card.Header>
            <Image floated="right" size="small" src={Meteor.user().profile.picture}/>
          </Card.Content>
          <Card.Content>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                First Name:
              </div>
              <br/>
              {Meteor.user().profile.firstName}
            </Card.Description>
            <br/>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                Last Name:
              </div>
              <br/>
              {Meteor.user().profile.lastName}
            </Card.Description>
            <br/>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                Interests:
              </div>
              <br/>
              {userInterests}
            </Card.Description>
            <br/>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                Clubs:
              </div>
              <br/>
              {userClubs}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Link to="/edituserprofile">
              <Button size="big">Edit</Button>
            </Link>
          </Card.Content>
        </Card>
    );
  }
}

export default UserProfile;
