import Ember from 'ember';
import RotaBarItem from 'ess/mixins/rota-bar-item';

export default Ember.Component.extend(RotaBarItem, {
  classNames: ['rota-overlap'],

  overlap: null,
  selectedOverlap: null,

  meta: function() {
    return this.get('overlap.meta');
  }.property('overlap.meta'),

  startAsMinutes: function() {
    return this.get('overlap.startAsMinutes');
  }.property('overlap.startAsMinutes'),

  endAsMinutes: function() {
    return this.get('overlap.endAsMinutes');
  }.property('overlap.endAsMinutes'),

  selected: function() {
    return Ember.isEqual(this.get('overlap'), this.get('selectedOverlap'));
  }.property('overlap', 'selectedOverlap'),

  locations: function() {
    var locations = new Ember.Set();
    this.get('overlap.shifts').forEach(s => locations.add(s.get('location')));
    return locations.toArray();
  }.property('overlap'),

  jobTitles: function() {
    var titles = new Ember.Set();
    this.get('overlap.shifts').forEach(s => titles.add(s.get('jobTitle')));
    return titles.toArray();
  }.property('overlap'),

  tap: function() {
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
