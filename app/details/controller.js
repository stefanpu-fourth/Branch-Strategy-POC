import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  isBlankAddress2: function(){
    return Ember.isBlank(this.get('attrs.employee.address2'));
  }.property('attrs.employee.address2'),

  isBlankAddress3: function(){
    return Ember.isBlank(this.get('attrs.employee.address3'));
  }.property('attrs.employee.address3'),

  isBlankCounty: function(){
    return Ember.isBlank(this.get('attrs.employee.county'));
  }.property('attrs.employee.county'),

  isBlankCountry: function(){
    return Ember.isBlank(this.get('attrs.employee.country'));
  }.property('attrs.employee.country')

});
