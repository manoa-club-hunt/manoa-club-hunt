import React from 'react';
import { Header, Loader, Container, List, Button } from 'semantic-ui-react';
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
        <Container className="user-profile-background">
          <Header as="h2" textAlign="center">Your Profile</Header>
          <List>
            <List.Item><Header as="h3">First Name:</Header></List.Item>
            <List.Item><p className="user profile list item">{userProfile.firstName}</p></List.Item>
            <List.Item><Header as="h3">Last Name:</Header></List.Item>
            <List.Item><p className="user profile list item">{userProfile.lastName}</p></List.Item>
            <List.Item><Header as="h3">Interests:</Header></List.Item>
            <List.Item><p className="user profile list item">{userInterests}</p></List.Item>
            <List.Item><Header as="h3">Clubs:</Header></List.Item>
            <List.Item><p className="user profile list item">{userClubs}</p></List.Item>
          </List>
          <Link to="/edituserprofile"><Button>Edit Profile</Button></Link>
        </Container>
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
