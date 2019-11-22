import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import Club from '/imports/ui/components/Club';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const clubsList = this.props.clubs;
    const email = Meteor.user().username;
    const userProfile = UserProfiles.findOne({ email });
    const userClubs = [];
    userProfile.interests.forEach(function (interest) {
      clubsList.forEach(function(club) {
        if (_.contains(club.interests, interest)) {
          userClubs.push(club);
        }
      });
    });
    const sortedClubs = userClubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1));
    return (
        <Container>
          <Header as="h2" textAlign="center">Club Listings</Header>
          <hr/>
          <Card.Group centered itemsPerRow={4}>
            {sortedClubs.map((club, index) => <Club key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserHome.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Clubs');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHome);
