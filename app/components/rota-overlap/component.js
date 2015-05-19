import Ember from 'ember';

var wholeDay = 24*60;

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota-shift', 'rota-overlap'],

  attributeBindings: ['style'],

  overlap: null,
  selectedOverlap: null,
  selectTarget: null,

  // TODO: refactor to avoid duplication (see rota-shift)
  dayStart: function() {
    return this.get('overlap.meta.dayStartAsMinutes') || 0;
  }.property('overlap.meta.dayStartAsMinutes'),

  dayEnd: function() {
    var dayEnd = this.get('overlap.meta.dayEndAsMinutes') || 0;
    if (dayEnd <= this.get('dayStart')) {
      dayEnd = dayEnd + (24 * 60);
    }
    return dayEnd;
  }.property('overlap.meta.dayEndAsMinutes', 'dayStart'),

  dayDuration: function() {
    return this.get('dayEnd') - this.get('dayStart');
  }.property('dayStart', 'dayEnd'),

  dayMiddle: function() {
    return this.get('dayStart') + (this.get('dayDuration') / 2);
  }.property('dayDuration', 'dayStart'),

  dayEarly: function() {
    return this.get('dayStart') + (this.get('dayDuration') / 4);
  }.property('dayDuration', 'dayStart'),

  tooltipLocation: function() {
    var dayIndex = this.get('dayIndex');
    var overlapStart = this.get('overlap.startAsMinutes');
    var classes = [];

    if (dayIndex < 2) {
      classes.push('-bottom');
    }
    if (overlapStart > this.get('dayMiddle')) {
      classes.push('-right');
    } else if (overlapStart > this.get('dayEarly')) {
      classes.push('-center');
    }
    return classes.join(' ');
  }.property('dayIndex', 'overlap.startAsMinutes', 'dayMiddle', 'dayEarly'),

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
    var dayStart = this.get('dayStart');
    var overlapStart = Math.max(this.get('overlap.startAsMinutes'), dayStart);

    return ((100 / this.get('dayDuration'))*(overlapStart - dayStart));
  }.property('overlap.startAsMinutes', 'dayStart', 'dayDuration'),

  durationPercent: function() {
    var dayEnd = this.get('dayEnd');
    var overlapStart = Math.max(this.get('overlap.startAsMinutes'), this.get('dayStart'));
    var overlapEnd   = Math.min(this.get('overlap.endAsMinutes'), dayEnd);

    if (overlapStart > overlapEnd) {
      overlapEnd = Math.min(overlapEnd + wholeDay, dayEnd);
    }

    return ((100 / this.get('dayDuration'))*(overlapEnd - overlapStart));
  }.property('overlap.startAsMinutes', 'overlap.endAsMinutes', 'dayStart', 'dayEnd', 'dayDuration'),

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
    var target = this.get("selectTarget");
    if (this.get('selected')) {
      target.send('setSelectedOverlap', null);
    } else {
      target.send('setSelectedOverlap', this.get('overlap'));
    }
    return false;
  }
});
