import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  employment: Ember.computed.alias('attrs.employment.firstObject')
});
