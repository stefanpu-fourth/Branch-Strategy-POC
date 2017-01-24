import Ember from 'ember';

/**
  @class EditContactForm
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  conditions: Ember.inject.service('conditional-validation-fields')
});
