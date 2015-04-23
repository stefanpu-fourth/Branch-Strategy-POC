import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota-shift'],

  attributeBindings: ['style'],

  shift: null,
  selectedShift: null,
  selectTarget: null,

  style: function() {
    var shift = this.get('shift');
    if (shift) {
      return `left: ${this.getStartPercent(shift)}%; width: ${this.getDurationPercent(shift)}%`.htmlSafe();
    }
  }.property('shift'),

  selected: function() {
    return Ember.isEqual(this.get('shift'), this.get('selectedShift'));
  }.property('shift', 'selectedShift'),

  selectedClass: function() {
    return this.get('selected') ? '-active' : '';
  }.property('selected'),

  convertToMinutes: function(time) {
    var hours   = parseInt(time.substring(0, 2));
    var minutes = parseInt(time.substring(2, 4));

    return (hours * 60) + minutes;
  },

  getStartPercent: function(shift) {
    var shiftStart = this.convertToMinutes(shift.start);

    return ((100 / this.convertToMinutes('2400'))*shiftStart);
  },

  getDurationPercent: function(shift) {
    var shiftStart = this.convertToMinutes(shift.start);
    var shiftEnd   = this.convertToMinutes(shift.end);

    if (shiftStart > shiftEnd) {
      shiftEnd = this.convertToMinutes('2400');
    }

    return ((100 / this.convertToMinutes('2400'))*(shiftEnd - shiftStart));
  },

  actions: {
    selectSegment: function() {
      var target = this.get("selectTarget");

      target.send('setSelectedShift', this.get('shift'));
    }
  }
});
