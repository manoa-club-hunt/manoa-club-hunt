import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    let clubInterests = this.props.club.interests;

    clubInterests = clubInterests.sort();
    return (
        <Card centered>
          <Card.Content>
            <Card.Header textAlign="center">{this.props.club.clubName}</Card.Header>
            <hr/>
            <Card.Description>
              <b>Contact: </b>
              {this.props.club.contact}
            </Card.Description>
            <Card.Description>
              <b>Website: </b>
              <a href="this.props.club.website">{this.props.club.website}</a>
            </Card.Description>
            <Card.Description>
              <b>Email: </b>
              {this.props.club.email}
            </Card.Description>
            <Card.Description>
              <b>Interests: </b>
              {clubInterests.map((obj, index) => <Label key={index} size='small' content={obj} />)}
            </Card.Description>
            <Card.Description textAlign="center">
              <em>
                <Link to={`/clubPage/${this.props.club._id}`}>View Profile</Link>
              </em>
            </Card.Description>
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
