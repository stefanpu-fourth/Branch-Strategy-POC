import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rota-bar'],
  classNameBindings: ['empty:-empty', 'isInPast:-past'],

  day: null,
  empty: null,
  selectedShift: null,
  selectedOverlap: null,
  selectTarget: null
});
