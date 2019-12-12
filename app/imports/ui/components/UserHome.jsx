import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import Club from '/imports/ui/components/Club';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs, clubsName } from '../../api/club/Club';

class UserHome extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const clubsList = this.props.clubs;
    const userClubs = [];
    const userInterests = Meteor.user().profile.interests;
    userInterests.forEach(function (interest) {
      clubsList.forEach(function (club) {
        if (_.contains(club.interests, interest) && !(_.contains(userClubs, club))) {
          userClubs.push(club);
        }
      });
    });
    const sortedClubs = userClubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1));
    return (
        <Container>
          <Header as="h2" textAlign="center">Clubs with Similar Interests to You</Header>
          <hr/>
          {
            sortedClubs.length !== 0 ?
                (<Card.Group centered itemsPerRow={8}>
                  {sortedClubs.map((club, index) => <Club key={index} club={club}/>)}
                </Card.Group>) : (
                    <div>
                      <Header as="h3" textAlign="center">
                        No Interests Listed.
                      </Header>
                      <Header as="h3" textAlign="center">
                        Add interests to see clubs with similar interests.
                      </Header>
                    </div>)
          }
        </Container>
    );
  }
}

UserHome.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(clubsName);
  return {
    clubs: Clubs.find({}).fetch(),
    ready: sub1.ready(),
  };
})(UserHome);
