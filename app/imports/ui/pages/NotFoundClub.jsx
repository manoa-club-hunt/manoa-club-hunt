import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFoundClub extends React.Component {
  render() {
    return (
        <Container textAlign="center">
          <Header as="h2" textAlign="center">
            <p>Club website not available</p>
          </Header>
          <Link to={'/list'}><em>Return to Club Listings</em></Link>
        </Container>
    );
  }
}

export default NotFoundClub;
