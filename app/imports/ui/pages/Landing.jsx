import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';
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
    const divStyle = { color: 'green' };
    return (
        <div>
          <div className="slide-container">
            <Fade {...fadeProperties}>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[0]}/>
                </div>
                <h2>Japanese Cultural Club</h2>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[1]}/>
                </div>
                <h2>Judo Club</h2>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[2]}/>
                </div>
                <h2>Pre-Vet Club</h2>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[3]}/>
                </div>
                <h2>Rotaract Club</h2>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[4]}/>
                </div>
                <h2>Chemistry Club</h2>
              </div>
            </Fade>
          </div>
          <div className="manoa-landing-background">
            <Grid container verticalAlign="middle" style={gridStyle}>
              <Grid.Row columns="two">
                <Grid.Column>
                  <Image src="https://www.logolynx.com/images/logolynx/81/819f03ed059e267365b9b32c4a0ca3e7.png"/>
                </Grid.Column>
                <Grid.Column>
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
