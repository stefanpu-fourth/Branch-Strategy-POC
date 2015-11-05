import Ember from 'ember';
import RotaBarItem from 'ess/mixins/rota-bar-item';

export default Ember.Component.extend(RotaBarItem, {
  shift: null,
  selectedShift: null,

  meta: Ember.computed.alias('shift.meta'),
  startAsMinutes: Ember.computed.alias('shift.startAsMinutes'),
  endAsMinutes: Ember.computed.alias('shift.endAsMinutes'),

  selected: function() {
    return Ember.isEqual(this.get('shift'), this.get('selectedShift'));
  }.property('shift', 'selectedShift'),

  click: function() {
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
