import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {

  render() {
    let disable = true;
    const clubsite = this.props.club.website;
    if (clubsite === '') {
      disable = true;
    } else {
      disable = false;
    }

    return (
        <Card centered className="clubcard">
          <Card.Content textAlign="center">
            <Image src={this.props.club.image} centered size="tiny" />
            <hr/>
            <Card.Header>{this.props.club.clubName}</Card.Header>
          </Card.Content>
          <Card.Content extra className="cardButtonExtra">
              <Button compact>
                <Link to={`/clubPage/${this.props.club._id}`}>View Profile</Link>
              </Button>
              <Button compact disabled={disable}>
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
