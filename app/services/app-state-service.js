import Ember from 'ember';

export default Ember.Service.extend({
  rootResource: null,

  authenticatedEmployeeId: Ember.computed.alias('rootResource.id'),

  authenticatedEmployeeToken: Ember.computed.alias('rootResource.token')
});
