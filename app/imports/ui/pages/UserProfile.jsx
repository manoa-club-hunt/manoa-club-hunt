import React from 'react';
import { Card, Loader, Button, Image } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let userInterests = '';
    let userClubs = '';
    if (Meteor.users()) {
      for (let i = 0; i < Meteor.users().profile.interests.length; i++) {
        if (i === Meteor.users().profile.interests.length - 1) {
          userInterests += Meteor.users().profile.interests[i];
        } else {
          userInterests += `${Meteor.users().profile.interests[i]}, `;
        }
      }
      for (let i = 0; i < Meteor.users().profile.clubs.length; i++) {
        if (i === Meteor.users().profile.clubs.length - 1) {
          userClubs += Meteor.users().profile.clubs[i];
        } else {
          userClubs += `${Meteor.users().profile.clubs[i]}, `;
        }
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
            <Image floated="right" size="small" src={Meteor.users().profile.picture}/>
          </Card.Content>
          <Card.Content>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                First Name:
              </div>
              <br/>
              {Meteor.users().profile.firstName}
            </Card.Description>
            <br/>
            <Card.Description className="userprofile card content">
              <div className="userprofile card content header">
                Last Name:
              </div>
              <br/>
              {Meteor.users().profile.lastName}
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

UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(userProfilesName);
  return {
    ready: sub1.ready(),
  };
})(UserProfile);
