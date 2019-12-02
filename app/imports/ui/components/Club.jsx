import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    const clubsite = this.props.club.website;
    return (
        <Card centered>
          <Card.Content textAlign="center" header={this.props.club.clubName} />
          <Card.Content textAlign="center">
            <em>
              <Link to={`/clubPage/${this.props.club._id}`}>View Profile</Link>
            </em>
          </Card.Content>
          <Card.Description textAlign="center">
            <em>
              <a href={clubsite}>Go to Website</a>
            </em>
          </Card.Description>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Club.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Club);
