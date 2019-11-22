import React from 'react';
import { Grid, Image, Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
        <div className="manoa-landing-background">
          <Grid container verticalAlign="middle" style={gridStyle}>
            <Grid.Row columns="two">
              <Grid.Column>
                <Image src="https://www.logolynx.com/images/logolynx/81/819f03ed059e267365b9b32c4a0ca3e7.png"/>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3" inverted>
                  Looking for a club? Ready to find the one for you? Like E-Harmony, we find the perfect match for you.
                  With the Manoa Club Hunt, we use a scientific algorithm to find people who are looking for people like
                  you. Get started today by registering for a free user profile on Manoa Club Hunt. So what are you
                  waiting for? Use Manoa Club Hunt today.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
