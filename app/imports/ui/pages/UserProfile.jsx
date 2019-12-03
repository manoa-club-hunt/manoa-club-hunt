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
    const email = Meteor.user().username;
    const userProfile = UserProfiles.findOne({ email });
    let userInterests = '';
    let userClubs = '';
    for (let i = 0; i < userProfile.interests.length; i++) {
      if (i === userProfile.interests.length - 1) {
        userInterests += userProfile.interests[i];
      } else {
        userInterests += `${userProfile.interests[i]}, `;
      }
    }
    for (let i = 0; i < userProfile.clubs.length; i++) {
      if (i === userProfile.clubs.length - 1) {
        userClubs += userProfile.clubs[i];
      } else {
        userClubs += `${userProfile.clubs[i]}, `;
      }
    }
    return (
        <Card centered>
          <Card.Content>
            <Image floated="right" size="tiny" src={userProfile.picture}/>
            <Card.Header>{userProfile.firstName} {userProfile.lastName}&apos;s Profile</Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>Interests: {userInterests}</Card.Description>
            <Card.Description>Clubs: {userClubs}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Button basic link="/edituserprofile">
              Edit
            </Button>
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
