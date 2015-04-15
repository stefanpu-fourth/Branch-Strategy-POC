import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['rota__shift'],

  attributeBindings: ['style'],

  style: function() {
    var shift = this.get('shift');
    if (shift) {
      return ("left: " + this.getStartPercent(shift) + "%; width: " + this.getDurationPercent(shift) + "%").htmlSafe();
    }
  }.property('shift'),

  getStartPercent: function(shift) {
    var start = this.getIntTime(shift.start);

    return (start/(60*24)) * 100;
  },

  getIntTime: function(time) {
    var hour = parseInt(time.substring(0,2));
    var minutes = parseInt(time.substring(2,4));
    return (hour * 60) + minutes;
  },

  getDurationPercent: function(shift) {
    var start = this.getIntTime(shift.start);
    var end = this.getIntTime(shift.end);
    if (end < start) {
      end = end + this.getIntTime('2400');
    }

    return ((end - start)/(60*24)) * 100;
  }
});
