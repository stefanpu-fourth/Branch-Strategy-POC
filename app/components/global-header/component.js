import Ember from 'ember';

/**
  @class GlobalHeader
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  /**
    @property tagName
    @type {String}
    @default nav
    @public
  */
  tagName: 'nav',

  /**
    @property classNames
    @type {Array}
    @default ['global-header']
    @public
  */
  classNames: ['global-header']
});
