import React from 'react';
import { Clubs } from '/imports/api/club/Club';
import { Feed, Icon, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for adding a document. */
class UserHome extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, interests, contact, website, email } = data;
    const owner = Meteor.user().username;
    Clubs.insert({ clubName, interests, contact, website, email, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Container>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary>
                  <a>Helen Troy</a> added <a>2 new illustrations</a>
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
                  <a>
                    <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />1 Like
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary
                    date='2 Days Ago'
                    user='Jenny Hess'
                    content='add you as a friend'
                />
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />8 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='/images/meteor-logo.png' />
              <Feed.Content>
                <Feed.Summary>
                  <a>Joe Henderson</a> posted on his page
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  Ours is a life of constant reruns. We&lsquore always circling back to where
                  we&lsquod we started, then starting all over again. Even if we don&lsquot run
                  extra laps that day, we surely will come back for more of the same
                  another day soon.
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />5 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Container>
    );
  }
}

export default UserHome;
