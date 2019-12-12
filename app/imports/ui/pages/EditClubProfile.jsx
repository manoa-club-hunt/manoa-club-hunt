import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ListField from 'uniforms-semantic/ListField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/club/Club';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  interests: Array,
  'interests.$': String,
  contact: String,
  website: { type: String, defaultValue: '' },
  email: { type: String, defaultValue: '' },
});

/** Renders the Page for editing a document. */
class EditClubProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { name, interests, contact, website, email, _id } = data;
    const owner = Meteor.user().username;
    Clubs.update(_id, { $set: { name, interests, contact, website, email, owner } },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Club</Header>
            <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <ListField name='interests'>
                  <TextField name='$' />
                </ListField>
                <TextField name='contact'/>
                <TextField name='website'/>
                <TextField name='email'/>
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
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Clubs');
  return {
    doc: Clubs.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditClubProfile);
