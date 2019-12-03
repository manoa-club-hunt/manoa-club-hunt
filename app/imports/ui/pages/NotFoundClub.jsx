import React from 'react';
import { Header, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFoundClub extends React.Component {
  render() {
    return (
        <Container textAlign="center">
          <Header as="h2" textAlign="center">
            <p>Club website not available</p>
          </Header>
          <Link to={'/list'}>Return to Club Listings</Link>
        </Container>
    );
  }
}

export default NotFoundClub;
