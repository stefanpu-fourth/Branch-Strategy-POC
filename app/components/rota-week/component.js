import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  classNames: ['rota-week'],

  week: null,
  shifts: null,
  selectedShift: null,
  selectTarget: null,

  click: function() {
    this.get('selectTarget').send('setSelectedShift', null);
  }
});
