import Ember from 'ember';

var dayAsMinutes = 24*60;

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota-shift', 'rota-overlap'],

  attributeBindings: ['style'],

  overlap: null,
  selectedOverlap: null,
  selectTarget: null,

  // tooltipLocation: function() {
  //   var dayIndex = this.get('dayIndex');
  //   var shiftStart = parseInt(this.get('overlap.start'), 10);
  //   var classes = '';

  //   if (dayIndex < 2) {
  //     classes += '-bottom ';
  //   }

  //   if (shiftStart > 13) {
  //     classes += '-right ';
  //   } else if (shiftStart > 6) {
  //     classes += '-center ';
  //   }
  //   return classes;
  // }.property('dayIndex', 'shift.start'),

  style: function() {
    var overlap = this.get('overlap');
    if (overlap) {
      return `left: ${this.get('startPercent')}%; width: ${this.get('durationPercent')}%`.htmlSafe();
    }
  }.property('overlap'),

  selected: function() {
    return Ember.isEqual(this.get('overlap'), this.get('selectedOverlap'));
  }.property('overlap', 'selectedOverlap'),

  selectedClass: function() {
    return this.get('selected') ? '-active' : '';
  }.property('selected'),

  pastClass: function() {
    return this.get('isInPast') ? '-past' : '';
  }.property('isInPast'),

  startPercent: function() {
    var overlapStart = this.get('overlap.startAsMinutes');

    return ((100 / dayAsMinutes)*overlapStart);
  }.property('overlap.startAsMinutes'),

  durationPercent: function() {
    var overlapStart = this.get('overlap.startAsMinutes');
    var overlapEnd   = this.get('overlap.endAsMinutes');

    if (overlapStart > overlapEnd) {
      overlapEnd = overlapEnd + dayAsMinutes;
    }

    return ((100 / dayAsMinutes)*(overlapEnd - overlapStart));
  }.property('overlap.startAsMinutes', 'overlap.endAsMinutes'),

  tap: function() {
    var target = this.get("selectTarget");
    if (this.get('selected')) {
      target.send('setSelectedOverlap', null);
    } else {
      target.send('setSelectedOverlap', this.get('overlap'));
    }
    return false;
  }
});
