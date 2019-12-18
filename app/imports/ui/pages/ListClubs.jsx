import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Dropdown } from 'semantic-ui-react';
import Club from '/imports/ui/components/Club';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Clubs } from '../../api/club/Club';
import { Interests } from '../../api/interests/Interests';

const _ = require('underscore');

class ListClubs extends React.Component {
  constructor(props) {
    super(props);
    const clubs = this.props.clubs;
    this.state = {
      value: '',
      list: clubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1)),
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.updateList.bind(this);

    // eslint-disable-next-line no-undef
    let location = window.location.href;
    if (location.length > 28) {
      location = location.slice(29, location.length);
      this.setState({ value: location });
      // eslint-disable-next-line meteor/no-session
      Session.set('value', location);
      // eslint-disable-next-line meteor/no-session
      this.updateList(Session.get('value'));
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
    if (name === 'value') {
      // eslint-disable-next-line meteor/no-session
      Session.set('value', value);
      // eslint-disable-next-line meteor/no-session
      this.updateList(Session.get('value'));
    }
  }

  updateList(interest) {
    const search = _.filter(this.props.clubs, function (club) {
      const arr = club.interests;
      return _.contains(arr, interest);
    });
    this.setState({
      list: search,
    });
    // eslint-disable-next-line meteor/no-session
    Session.set('list', search);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const clubs = this.props.clubs;
    // eslint-disable-next-line meteor/no-session
    Session.setDefault('list', clubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1)));
    const interestOptions = this.props.interests.map(int => ({
      key: int.interest,
      text: int.interest,
      value: int.interest,
    }));
    // eslint-disable-next-line meteor/no-session
    const list = Session.get('list');
    return (
        <Container>
          <Header as="h2" textAlign="center">Club Listings</Header>
          <hr/>
          <Dropdown
              clearable
              placeholder='Select Interest'
              fluid
              name={'value'}
              value={this.state.value}
              onChange={this.handleChange}
              search
              selection
              options={interestOptions}
          />
          <br/>
          <Card.Group centered itemsPerRow={8}>
            {list.map((club, index) => <Club key={index} club={club}/>)}
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
