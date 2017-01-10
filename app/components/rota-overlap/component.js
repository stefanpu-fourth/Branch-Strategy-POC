import Ember from 'ember';
import RotaBarItem from 'ess/mixins/rota-bar-item';

/**
  @class RotaOverlap
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend(RotaBarItem, {
  classNames: ['-overlap'],

  overlap: null,
  selectedOverlap: null,

  meta: Ember.computed.alias('overlap.meta'),
  startAsMinutes: Ember.computed.alias('overlap.startAsMinutes'),
  endAsMinutes: Ember.computed.alias('overlap.endAsMinutes'),

  selected: function() {
    return Ember.isEqual(this.get('overlap'), this.get('selectedOverlap'));
  }.property('overlap', 'selectedOverlap'),

  locations: function() {
    var locations = new Set();
    this.get('overlap.shifts').forEach(s => locations.add(s.get('location')));
    return [...locations];
  }.property('overlap'),

  jobTitles: function() {
    var titles = new Set();
    this.get('overlap.shifts').forEach(s => titles.add(s.get('jobTitle')));
    return [...titles];
  }.property('overlap'),

  click: function() {
    ga('send', 'event', 'rota', 'click', 'Shift overlap details');
    var target = this.get("selectTarget");
    if (this.get('selected')) {
      target.send('setSelectedOverlap', null);
    } else {
      target.send('setSelectedOverlap', this.get('overlap'));
    }
    return false;
  }
});
