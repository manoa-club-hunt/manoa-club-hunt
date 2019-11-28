import React from 'react';
import { Grid } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const layout = { height: '170px', paddingTop: '20px', paddingBottom: '20px', width: '100%', background: '#024731' };
    const divStyle = { color: 'white' };
    return (
        <footer>
          <div style={divStyle}>
            <div style={layout}>
              <Grid columns={1} className="footer-background" centered>
                <p><b>University of Hawaii at Manoa</b><br/>
                  Produced by: ICS 314 Students<br/>
                  Sponsors: Philip M. Johnson<br/>
                  Copyright © 2019<br/>
                  All Rights Reserved</p>
              </Grid>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
