import React from 'react';
import { Header, Loader, Container, List } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';

class UserProfile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = Meteor.user().username;
    const userProfile = UserProfiles.findOne({ email });
    return (
        <Container>
          <Header as="h2" textAlign="center">Your Profile</Header>
          <List>
            <List.Item><Header as="h3">First Name:</Header></List.Item>
            <List.Item><p>{userProfile.firstName}</p></List.Item>
            <List.Item><Header as="h3">Last Name:</Header></List.Item>
            <List.Item><p>{userProfile.lastName}</p></List.Item>
            <List.Item><Header as="h3">Interests:</Header></List.Item>
            <List.Item><p>{userProfile.interests.reduce((memo, interest) => `${memo}, ${interest}`)}</p></List.Item>
            <List.Item><Header as="h3">Clubs:</Header></List.Item>
            <List.Item><p>{userProfile.clubs.reduce((memo, interest) => `${memo}, ${interest}`)}</p></List.Item>
            <List.Item><Header as="h3">Image URL:</Header></List.Item>
            <List.Item><p>{userProfile.image}</p></List.Item>
          </List>
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
