import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota-shift'],

  attributeBindings: ['style'],

  shift: null,
  selectedShift: null,
  selectTarget: null,

  tooltipLocation: function() {
    var dayIndex = this.get('dayIndex');
    var shiftStart = parseInt(this.get('shift.start'), 10);
    var classes = '';

    if (dayIndex < 2) {
      classes += '-bottom ';
    }
    if (shiftStart > 11) {
      classes += '-right ';
    }
    return classes;
  }.property('dayIndex', 'shift.start'),

  style: function() {
    var shift = this.get('shift');
    if (shift) {
      return `left: ${this.get('startPercent')}%; width: ${this.get('durationPercent')}%`.htmlSafe();
    }
  }.property('shift'),

  selected: function() {
    return Ember.isEqual(this.get('shift'), this.get('selectedShift'));
  }.property('shift', 'selectedShift'),

  selectedClass: function() {
    return this.get('selected') ? '-active' : '';
  }.property('selected'),

  pastClass: function() {
    return this.get('isInPast') ? '-past' : '';
  }.property('isInPast'),

  // TODO SJ - this behaviour belongs on the shift object itself
  convertToMinutes: function(time) {
    var hours   = parseInt(time.substring(0, 2));
    var minutes = parseInt(time.substring(3, 5));

    return (hours * 60) + minutes;
  },

  shiftStartAsMinutes: function() {
    return this.convertToMinutes(this.get('shift.start'));
  }.property('shift.start'),

  shiftEndAsMinutes: function() {
    return this.convertToMinutes(this.get('shift.end'));
  }.property('shift.end'),

  startPercent: function() {
    var shiftStart = this.get('shiftStartAsMinutes');

    return ((100 / this.convertToMinutes('24:00'))*shiftStart);
  }.property('shiftStartAsMinutes'),

  durationPercent: function() {
    var shiftStart = this.get('shiftStartAsMinutes');
    var shiftEnd   = this.get('shiftEndAsMinutes');

    if (shiftStart > shiftEnd) {
      shiftEnd = this.convertToMinutes('24:00');
    }

    return ((100 / this.convertToMinutes('24:00'))*(shiftEnd - shiftStart));
  }.property('shiftStartAsMinutes', 'shiftEndAsMinutes'),

  tap: function() {
      var target = this.get("selectTarget");
      target.send('setSelectedShift', this.get('shift'));
    }
});
