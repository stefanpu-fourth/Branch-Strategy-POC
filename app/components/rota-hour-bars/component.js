import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-hour-bars'],

  // defaults for dayStart, dayEnd in minutes, and period in hours - can be overridden
  dayStart: 0,
  dayEnd: 0,
  period: 3,

  // bars array to denote % positions through the day
  bars: function() {
    // generate some bars to display
    // we need our start/end times
    // also what frequency
    var start = this.get('dayStart') || 0;
    var end = this.get('dayEnd') || 0;
    if (end <= start) {
      end = end + (24 * 60);
    }

    var duration = end - start;
    var multiplier = 100 / duration;
    var period = this.get('period') * 60;

    // tweak bar start time so it lines up with a period
    var barTime = (start - (start % period)) + period;
    var bars = [];

    while (barTime < end) {
      bars.push((barTime - start) * multiplier);
      barTime = barTime + period;
    }

    return bars;
  }.property('dayStart', 'dayEnd', 'period')
});
