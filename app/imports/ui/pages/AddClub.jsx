import React from 'react';
import { Clubs } from '/imports/api/club/Club';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import LongTextField from 'uniforms-semantic/LongTextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests } from '../../api/interests/Interests';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  clubName: String,
  interests: Array,
  'interests.$': { type: String, allowedValues: allInterests },
  contact: String,
  website: { type: String, defaultValue: '', optional: true },
  email: { type: String, defaultValue: '' },
  image: { type: String, defaultValue:
        'https://clt.manoa.hawaii.edu/wp-content/uploads/2016/08/Manoa-seal-297x300.png' },
  description: { type: String, defaultValue: 'No description available.', optional: true },
  });

/** Renders the Page for adding a document. */
class AddClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, interests, contact, website, email, image, description } = data;
    const owner = Meteor.user().username;
    Clubs.insert({ clubName, interests, contact, website, email, image, description, owner },
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
    let fRef = null;
    const allInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(allInterests);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Club</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='clubName' placeholder="e.g. AECT-Hawaii"/>
                <MultiSelectField name='interests' placeholder="e.g. Academic"/>
                <TextField name='contact' placeholder="e.g. Waynele Yu"/>
                <TextField name='website' placeholder="e.g.
                  https://coe.hawaii.edu/students/association-educational-communications-technology-aect-hi"/>
                <TextField name='email' placeholder="e.g. yourname@hawaii.edu"/>
                <TextField name='image' placeholder="e.g.
                  https://clt.manoa.hawaii.edu/wp-content/uploads/2016/08/Manoa-seal-297x300.png" />
                <LongTextField name='description' placeholder="Enter description here." />
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddClub.propTypes = {
  ready: PropTypes.bool.isRequired,
  interests: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Interests');
  return {
    interests: Interests.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddClub);
