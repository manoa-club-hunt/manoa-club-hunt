import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests, interestsName } from '../../api/interests/Interests';
import { UserProfiles, userProfilesName } from '../../api/userprofiles/UserProfiles';
import { UserProfilesClubs, userProfilesClubsName } from '../../api/userprofiles/UserProfilesClubs';
import { UserProfilesInterests, userProfilesInterestsName } from '../../api/userprofiles/UserProfilesInterests';
import { Clubs, clubsName } from '../../api/club/Club';
import { updateUserProfileMethod } from '../../startup/both/Methods';

const makeSchema = (allInterests, allClubs) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  clubs: { type: Array, label: 'Projects', optional: true },
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
    const allInterests = _.pluck(Interests.find().fetch(), 'name');
    const allClubs = _.pluck(Clubs.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allClubs);
    const clubs = _.pluck(UserProfilesClubs.find({ profile: email }).fetch(), 'club');
    const interests = _.pluck(UserProfilesInterests.find({ profile: email }).fetch(), 'interest');
    const userProfile = UserProfiles.findOne({ email });
    const model = _.extend({}, userProfile, { interests, clubs });
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
                  <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
                  <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                  <MultiSelectField name='clubs' showInlineError={true} placeholder={'Clubs'}/>
                </Form.Group>
                <SubmitField value='Save'/>
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
  const sub1 = Meteor.subscribe(interestsName);
  const sub2 = Meteor.subscribe(userProfilesName);
  const sub3 = Meteor.subscribe(userProfilesInterestsName);
  const sub4 = Meteor.subscribe(userProfilesClubsName);
  const sub5 = Meteor.subscribe(clubsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(UserProfile);
