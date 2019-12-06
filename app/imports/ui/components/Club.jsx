import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    let clubsite = this.props.club.website;
    if (clubsite === '') {
      clubsite = '/#/notfoundclub';
    }
    return (
        <Card centered className="clubcard">
          <Card.Content textAlign="center" header={this.props.club.clubName}/>
          <Card.Content extra className="cardButtonExtra">
              <Button compact>
                <Link to={`/clubPage/${this.props.club._id}`}>View Profile</Link>
              </Button>
              <Button compact>
                <a href={clubsite}>View Website</a>
              </Button>
          </Card.Content>
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
