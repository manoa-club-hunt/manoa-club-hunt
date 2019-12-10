import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import UserHome from '../components/UserHome';

const fadeImages = [
  'images/japcultureClub.jpg',
  'images/judoClub.jpg',
  'images/vetClub.jpg',
  'images/rotaractClub.jpg',
  'images/chemistryClub.jpg',
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  },
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
        <div>
          <div className="manoa-landing-background">
            <Grid container verticalAlign="middle" style={gridStyle}>
              <Grid.Row columns="two">
                <Grid.Column width={10}>
                  <div className="slide-container">
                    <Fade {...fadeProperties}>
                      <div className="each-fade">
                        <div className="image-container">
                          <img src={fadeImages[0]}/>
                        </div>
                      </div>
                      <div className="each-fade">
                        <div className="image-container">
                          <img src={fadeImages[1]}/>
                        </div>
                      </div>
                      <div className="each-fade">
                        <div className="image-container">
                          <img src={fadeImages[2]}/>
                        </div>
                      </div>
                      <div className="each-fade">
                        <div className="image-container">
                          <img src={fadeImages[3]}/>
                        </div>
                      </div>
                      <div className="each-fade">
                        <div className="image-container">
                          <img src={fadeImages[4]}/>
                        </div>
                      </div>
                    </Fade>
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Header as="h3">
                    Looking for a club? Ready to find the one for you? Like E-Harmony, we find the perfect match for
                    you. With the Manoa Club Hunt, we use a scientific algorithm to find clubs who are looking for
                    people like you. Get started today by registering for a free user profile on Manoa Club Hunt. So
                    what are you waiting for? Use Manoa Club Hunt today.
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          {this.props.currentUser ?
              (
                  <div>
                    <hr/>
                    <br/>
                    <UserHome/>
                    <br/>
                  </div>
              ) : ''
          }
        </div>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

export default withTracker(() => (
    {
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }
))(Landing);
