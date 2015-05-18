import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-hour-bar'],

  attributeBindings: ['style'],

  startPercent: null,

  style: function() {
    return `left: ${this.get('startPercent')}%`.htmlSafe();
  }.property('startPercent')
});
