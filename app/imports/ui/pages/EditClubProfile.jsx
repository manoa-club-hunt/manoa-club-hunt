import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import LongTextField from 'uniforms-semantic/LongTextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests } from '../../api/interests/Interests';
import { Clubs } from '../../api/club/Club';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = (allInterests) => new SimpleSchema({
  clubName: String,
  image: String,
  description: { type: String, defaultValue: 'No description available.', optional: true },
  interests: Array,
  'interests.$': { type: String, allowedValues: allInterests },
  contact: String,
  website: { type: String, defaultValue: '', optional: true },
  email: { type: String, defaultValue: '' },
});

/** Renders the Page for editing a document. */
class EditClubProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { clubName, interests, contact, website, email, image, description, _id } = data;
    const owner = Meteor.user().username;
    if (website === '' && description === '') {
      Clubs.update(_id, { $set: { clubName, interests, contact, email, image, owner } },
          (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
    } else if (website === '') {
      Clubs.update(_id, { $set: { clubName, interests, contact, email, image, description, owner } },
          (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
    } else if (description === '') {
      Clubs.update(_id, { $set: { clubName, interests, contact, website, email, image, owner } },
          (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
    } else {
      Clubs.update(_id, { $set: { clubName, interests, contact, website, email, image, description, owner } },
          (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const allInterests = _.pluck(Interests.find().fetch(), 'interest');
    const makeSchema = formSchema(allInterests);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Club</Header>
            <AutoForm schema={makeSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='clubName'/>
                <MultiSelectField name='interests'/>
                <TextField name='contact'/>
                <TextField name='website'/>
                <TextField name='email'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditClubProfile.propTypes = {
  doc: PropTypes.object,
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Clubs');
  const subscription1 = Meteor.subscribe('Interests');
  return {
    doc: Clubs.findOne(documentId),
    interests: Interests.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(EditClubProfile);
