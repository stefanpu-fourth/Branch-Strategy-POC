import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  isBlankAddress2: Ember.computed.empty('attrs.employee.address2'),
  isBlankAddress3: Ember.computed.empty('attrs.employee.address3'),
  isBlankCounty: Ember.computed.empty('attrs.employee.county'),
  isBlankCountry: Ember.computed.empty('attrs.employee.country')

});
