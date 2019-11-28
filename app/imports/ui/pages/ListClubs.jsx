import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Dropdown } from 'semantic-ui-react';
import Club from '/imports/ui/components/Club';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';
import { Interests } from '../../api/interests/Interests';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {

  state = { searchQuery: '' }

  handleChange = (e, { searchQuery, value }) => this.setState({ searchQuery, value })

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const interestOptions = this.props.interests.map(int => ({
      key: int.interest,
      text: int.interest,
      value: int.interest,
    }));
    let ClubList = this.props.clubs;
    ClubList = ClubList.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1));

    const { searchQuery, value } = this.state;

    return (
        <Container>
          <Header as="h2" textAlign="center">Club Listings</Header>
          <hr/>
          <Dropdown
              placeholder='Select Interest'
              fluid
              multiple
              onChange={this.handleChange}
              onSearchChange={this.handleSearchChange}
              search
              searchQuery={searchQuery}
              value={value}
              selection
              options={interestOptions}
          />
          <br/>
          <Card.Group centered itemsPerRow={4}>
            {ClubList.map((club, index) => <Club key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Clubs');
  const subscription1 = Meteor.subscribe('Interests');
  return {
    clubs: Clubs.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(ListClubs);
