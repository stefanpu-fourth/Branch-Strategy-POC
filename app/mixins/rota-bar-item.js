import Ember from 'ember';

var wholeDay = 24*60;

export default Ember.Mixin.create({
  tagName: 'span',

  classNames: ['rota-shift'],

  attributeBindings: ['style'],

  selectTarget: null,

  dayStart: function() {
    return this.get('meta.dayStartAsMinutes') || 0;
  }.property('meta.dayStartAsMinutes'),

  dayEnd: function() {
    var dayEnd = this.get('meta.dayEndAsMinutes') || 0;
    if (dayEnd <= this.get('dayStart')) {
      dayEnd = dayEnd + wholeDay;
    }
    return dayEnd;
  }.property('meta.dayEndAsMinutes', 'dayStart'),

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
    var itemStart = this.get('startAsMinutes');
    var classes = [];

    if (dayIndex < 2) {
      classes.push('-bottom');
    }
    if (itemStart > this.get('dayMiddle')) {
      classes.push('-right');
    } else if (itemStart > this.get('dayEarly')) {
      classes.push('-center');
    }
    return classes.join(' ');
  }.property('dayIndex', 'startAsMinutes', 'dayMiddle', 'dayEarly'),

  style: function() {
    return `left: ${this.get('startPercent')}%; width: ${this.get('durationPercent')}%`.htmlSafe();
  }.property('startPercent', 'durationPercent'),

  selectedClass: function() {
    return this.get('selected') ? '-active' : '';
  }.property('selected'),

  pastClass: function() {
    return this.get('isInPast') ? '-past' : '';
  }.property('isInPast'),

  startPercent: function() {
    var dayStart = this.get('dayStart');
    var itemStart = Math.max(this.get('startAsMinutes'), dayStart);

    return ((100 / this.get('dayDuration')) * (itemStart - dayStart));
  }.property('startAsMinutes', 'dayStart', 'dayDuration'),

  durationPercent: function() {
    var dayEnd = this.get('dayEnd');
    var itemStart = Math.max(this.get('startAsMinutes'), this.get('dayStart'));
    var itemEnd   = Math.min(this.get('endAsMinutes'), dayEnd);

    if (itemStart > itemEnd) {
      itemEnd = Math.min(itemEnd + wholeDay, dayEnd);
    }

    return ((100 / this.get('dayDuration')) * (itemEnd - itemStart));
  }.property('startAsMinutes', 'endAsMinutes', 'dayStart', 'dayEnd', 'dayDuration')
});
