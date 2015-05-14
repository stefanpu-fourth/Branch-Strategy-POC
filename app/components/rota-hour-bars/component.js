import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-hour-bars'],

  rotaService: Ember.inject.service(),

  // default period in hours - can be overridden
  period: 3,

  // bars array to denote % positions through the day
  bars: null,

  willInsertElement: function() {
    // generate some bars to display
    // we need our start/end times
    // also what frequency
    var start = this.get('rotaService.startAsMinutes');
    var end = this.get('rotaService.endAsMinutes');
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

    this.set('bars', bars);
  }
});
