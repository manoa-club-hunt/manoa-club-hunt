import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import Club from '/imports/ui/components/Club';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs, clubsName } from '../../api/club/Club';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';

class UserHome extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const clubsList = this.props.clubs;
    const userClubs = [];
    const email = Meteor.user().username;
    const userProfile = UserProfiles.findOne({ email: email });
    const userInterests = userProfile.interests;
    userInterests.forEach(function (interest) {
      clubsList.forEach(function (club) {
        if (_.contains(club.interests, interest)) {
          userClubs.push(club);
        }
      });
    });
    const sortedClubs = userClubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1));
    return (
        <Container>
          {sortedClubs === [] ?
              (<Header as="h2" textAlign="center">Clubs with Similar Interests to You</Header>) : (
                  <div>
                    <Header as="h2" textAlign="center">
                      No Interests Listed.
                    </Header>
                    <Header as="h3" textAlign="center">
                      Add interests to see clubs with similar interests.
                    </Header>
                  </div>)
          }
          <Card.Group centered itemsPerRow={4}>
            {sortedClubs.map((club, index) => <Club key={index} club={club}/>)}
          </Card.Group>
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
  const sub2 = Meteor.subscribe(userProfilesName);
  return {
    clubs: Clubs.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(UserHome);
