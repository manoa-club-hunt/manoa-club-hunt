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
    const email = Meteor.user().username;
    const userProfile = UserProfiles.findOne({ email });
    const userClubs = [];
    userProfile.interests.forEach(function (interest) {
      clubsList.forEach(function (club) {
        if (_.contains(club.interests, interest)) {
          userClubs.push(club);
        }
      });
    });
    const sortedClubs = userClubs.sort((a, b) => ((a.clubName > b.clubName) ? 1 : -1));
    return (
        <Container>
<<<<<<< HEAD
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary>
                  <a>Helen Troy</a> added <a>2 new illustrations</a>
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />1 Like
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary
                    date='2 Days Ago'
                    user='Jenny Hess'
                    content='add you as a friend'
                />
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />8 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary>
                  <a>Joe Henderson</a> posted on his page
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  Ours is a life of constant reruns. We&apos;re always circling back to where
                  we&apos;d we started, then starting all over again. Even if we don&apos;t run
                  extra laps that day, we surely will come back for more of the same
                  another day soon.
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />5 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
=======
          <Header as="h2" textAlign="center">Clubs with Similar Interests to You</Header>
          <hr/>
          <Card.Group centered itemsPerRow={4}>
            {sortedClubs.map((club, index) => <Club key={index} club={club}/>)}
          </Card.Group>
>>>>>>> origin/issue-10
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
