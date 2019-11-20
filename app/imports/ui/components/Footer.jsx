import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <Grid container columns={3} className="footer-background" centered>

              <Grid.Column>
                <div>
                  <p><b>University of Hawaii at Manoa</b></p>
                  <p>2500 Campus Rd</p>
                  <p>Honolulu, HI 96822</p>
                </div>
              </Grid.Column>

              <Grid.Column>
                <List link>
                  <List.Item as='a'>List Clubs</List.Item>
                </List>
              </Grid.Column>

              <Grid.Column>
                <div>
                  <p>Produced by: ICS 314 Students</p>
                  <p>Sponsors: Philip M. Johnson</p>
                  <p>Copyright © 2019</p>
                  <p>All Rights Reserved</p>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
