import React from 'react';
import { Grid, Segment, Header, Form, Loader, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests, interestsName } from '../../api/interests/Interests';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';
import { Clubs, clubsName } from '../../api/club/Club';
import { updateUserProfileMethod } from '../../startup/both/Methods';

const makeSchema = (allInterests, allClubs) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  clubs: { type: Array, label: 'Clubs', optional: true },
  'clubs.$': { type: String, allowedValues: allClubs },
});

class UserProfile extends React.Component {

  submit(data) {
    Meteor.call(updateUserProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated', 'success');
      }
    });
  }


  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = Meteor.user().username;
    const allInterests = _.pluck(Interests.find().fetch(), 'interest');
    const allClubs = _.pluck(Clubs.find().fetch(), 'clubName');
    const formSchema = makeSchema(allInterests, allClubs);
    const userProfile = UserProfiles.findOne({ email });
    const model = _.extend({}, userProfile);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Profile</Header>
            <AutoForm model={model} schema={formSchema} onSubmit={data => this.submit(data)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='firstName' showInlineError={true} placeholder={'First Name'}/>
                  <TextField name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='email' showInlineError={true} placeholder={'email'}/>
                  <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                  <MultiSelectField name='clubs' showInlineError={true} placeholder={'Clubs'}/>
                </Form.Group>
                <SubmitField value='Save'/>
                <Link to="/userprofile"><Button>Cancel</Button></Link>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(userProfilesName);
  const sub2 = Meteor.subscribe(clubsName);
  const sub3 = Meteor.subscribe(interestsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(UserProfile);
