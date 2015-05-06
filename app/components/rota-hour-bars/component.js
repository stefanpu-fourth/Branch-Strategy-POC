import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-hour-bars'],

  // bars array to denote % positions through the day
  bars: null,

  willInsertElement: function() {
    // generate some bars to display

    // we need our start/end times
    // also what frequency

    // TODO: make this more sensible
    // i.e. use a common setting for this info from somewhere
    var start = 6 * 60;   // 6am
    var end = 24 * 60;    // midnight
    var duration = end - start;

    var period = 3 * 60;

    var multiplier = 100 / duration;

    var barTime = start + period;
    var bars = [];

    while (barTime < end) {
      bars.push((barTime - start) * multiplier);
      barTime = barTime + period;
    }

    this.set('bars', bars);
  }
});
