import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-bar'],
  classNameBindings: ['empty:-empty', 'isInPast:-past'],

  shifts: null,
  empty: null,
  selectedShift: null,
  selectTarget: null
});
