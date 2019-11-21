import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Clubs } from '../../api/club/Club';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class clubPage extends React.Component {


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** UPDATE THIS SECTION TO DISPLAY CLUB DATA */
  renderPage() {
    return (
        <Container>
          <Header as="h1" textAlign="left" >{this.props.clubs.clubName}</Header>
          <Header as="h3" textAlign="left">
            Interest Area(s): {this.props.clubs.interests.reduce((memo, interest) => ` ${memo} ${interest}`)}</Header>
          <Header as="h3" textAlign="left">Club Info</Header>
          <div className="ui bulleted list">
            <div className="item">Website: {this.props.clubs.website}</div>
            <div className="item">Contact: {this.props.clubs.contact}</div>
            <div className="item">Email: {this.props.clubs.email}</div>
          </div>
          <Link to={`/edit/${this.props.clubs._id}`}>Edit Club</Link>
          <hr/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
clubPage.propTypes = {
  clubs: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to club documents.
  const subscription = Meteor.subscribe('Clubs');
  return {
    clubs: Clubs.findOne(documentId),
    ready: subscription.ready(),
  };
})(clubPage);
