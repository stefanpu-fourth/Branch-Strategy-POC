import Ember from 'ember';

/**
  @class RotaHourBar
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  classNames: ['rota-hour-bar'],

  attributeBindings: ['style'],

  startPercent: null,

  style: function() {
    return `left: ${this.get('startPercent')}%`.htmlSafe();
  }.property('startPercent')
});
