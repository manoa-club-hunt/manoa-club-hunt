import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const club = this.props.clubs.filter(club => club.clubName === this.props.clubs.clubName);
    return (
        <Container>
          <Header as="h2" textAlign="center">{club.clubName}</Header>
        <hr/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ClubPage.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(( match ) => {
  const documentId = match.params._id;
  // Get access to club documents.
  const subscription = Meteor.subscribe('Clubs');
  return {
    clubs: Clubs.findOne(documentId),
    ready: subscription.ready(),
  };
})(ClubPage);
