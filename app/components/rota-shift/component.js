import Ember from 'ember';

var wholeDay = 24*60;

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota-shift'],

  attributeBindings: ['style'],

  rotaService: Ember.inject.service(),

  shift: null,
  selectedShift: null,
  selectTarget: null,

  dayStart: null,
  dayEnd: null,

  dayDuration: function() {
    return this.get('dayEnd') - this.get('dayStart');
  }.property('dayStart', 'dayEnd'),

  dayMiddle: function() {
    return this.get('dayStart') + (this.get('dayDuration') / 2);
  }.property('dayDuration', 'dayStart'),

  dayEarly: function() {
    return this.get('dayStart') + (this.get('dayDuration') / 4);
  }.property('dayDuration', 'dayStart'),

  init: function() {
    // Set defaults for dayStart and dayEnd
    var dayStart = this.get('dayStart');
    if (dayStart === null) {
      this.set('dayStart', this.get('rotaService.startAsMinutes'));
    }
    var oldDayEnd = this.get('dayEnd');
    var dayEnd = oldDayEnd;
    if (dayEnd === null) {
      dayEnd = this.get('rotaService.endAsMinutes');
    }

    // make sure dayEnd is after the start
    if (dayEnd <= dayStart) {
      dayEnd = dayEnd + wholeDay;
    }

    if (dayEnd !== oldDayEnd) {
      this.set('dayEnd', dayEnd);
    }

    return this._super();
  },

  tooltipLocation: function() {
    var dayIndex = this.get('dayIndex');
    var shiftStart = this.get('shift.startAsMinutes');
    var classes = [];

    if (dayIndex < 2) {
      classes.push('-bottom');
    }
    if (shiftStart > this.get('dayMiddle')) {
      classes.push('-right');
    } else if (shiftStart > this.get('dayEarly')) {
      classes.push('-center');
    }
    return classes.join(' ');
  }.property('dayIndex', 'shift.startAsMinutes', 'dayMiddle', 'dayEarly'),

  style: function() {
    var shift = this.get('shift');
    if (shift) {
      return `left: ${this.get('startPercent')}%; width: ${this.get('durationPercent')}%`.htmlSafe();
    }
  }.property('shift', 'startPercent', 'durationPercent'),

  selected: function() {
    return Ember.isEqual(this.get('shift'), this.get('selectedShift'));
  }.property('shift', 'selectedShift'),

  selectedClass: function() {
    return this.get('selected') ? '-active' : '';
  }.property('selected'),

  pastClass: function() {
    return this.get('isInPast') ? '-past' : '';
  }.property('isInPast'),

  startPercent: function() {
    var dayStart = this.get('dayStart');
    var shiftStart = Math.max(this.get('shift.startAsMinutes'), dayStart);

    return ((100 / this.get('dayDuration'))*(shiftStart - dayStart));
  }.property('shift.startAsMinutes', 'dayStart', 'dayDuration'),

  durationPercent: function() {
    var dayEnd = this.get('dayEnd');
    var shiftStart = Math.max(this.get('shift.startAsMinutes'), this.get('dayStart'));
    var shiftEnd   = Math.min(this.get('shift.endAsMinutes'), dayEnd);

    if (shiftStart > shiftEnd) {
      shiftEnd = Math.min(shiftEnd + wholeDay, dayEnd);
    }

    return ((100 / this.get('dayDuration'))*(shiftEnd - shiftStart));
  }.property('shift.startAsMinutes', 'shift.endAsMinutes', 'dayStart', 'dayEnd', 'dayDuration'),

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
