import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNameBindings: ['isInPast:rota__past'],

  shiftDateAsMoment: function() {
    return moment(this.get('shift.shiftDate'));
  }.property(),

  isInPast: function() {
    return this.get('shiftDateAsMoment').isBefore(moment().startOf('day'));
  }.property(),

  isNotRota: function() {
    var type = this.get('shift.type');

    var onOff = /^o(n|ff)$/i;

    return !(onOff.test(type));
  }.property('shift.type')
});
