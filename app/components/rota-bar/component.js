import Ember from 'ember';

/**
  @class RotaBar
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  classNames: ['rota-bar'],
  classNameBindings: ['empty:-empty', 'isInPast:-past'],

  day: null,
  empty: null,
  selectedShift: null,
  selectedOverlap: null,
  selectTarget: null
});
