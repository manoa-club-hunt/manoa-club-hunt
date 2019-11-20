import React from 'react';
import { Clubs } from '/imports/api/club/Club';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ListField from 'uniforms-semantic/ListField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  clubName: String,
  interests: Array,
  'interests.$': String,
  contact: String,
  website: { type: String, defaultValue: '' },
  email: { type: String, defaultValue: '' },
});

/** Renders the Page for adding a document. */
class EditClubProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, interests, contact, website, email } = data;
    const owner = Meteor.user().username;
    Clubs.insert({ clubName, interests, contact, website, email, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item edited successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Club</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='clubName'/>
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

export default EditClubProfile;
