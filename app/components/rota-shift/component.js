import Ember from 'ember';
import RotaBarItem from 'ess/mixins/rota-bar-item';

export default Ember.Component.extend(RotaBarItem, {
  shift: null,
  selectedShift: null,

  meta: function() {
    return this.get('shift.meta');
  }.property('shift.meta'),

  startAsMinutes: function() {
    return this.get('shift.startAsMinutes');
  }.property('shift.startAsMinutes'),

  endAsMinutes: function() {
    return this.get('shift.endAsMinutes');
  }.property('shift.endAsMinutes'),

  selected: function() {
    return Ember.isEqual(this.get('shift'), this.get('selectedShift'));
  }.property('shift', 'selectedShift'),

  tap: function() {
    ga('send', 'event', 'rota', 'click', 'Shift details');
    var target = this.get("selectTarget");
    if (this.get('selected')) {
      target.send('setSelectedShift', null);
    } else {
      target.send('setSelectedShift', this.get('shift'));
    }
    return false;
  }
});
