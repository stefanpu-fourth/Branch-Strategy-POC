import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  classNames: ['rota-week'],

  week: null,
  shifts: null,
  selectedShift: null,
  selectTarget: null,

  tap: function() {
    this.set('selectedShift',null);
  }
});
