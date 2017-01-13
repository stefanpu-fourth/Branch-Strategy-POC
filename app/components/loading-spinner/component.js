import Ember from 'ember';

/**
  @class LoadingSpinner
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property tagName
    @type {String}
    @default div
    @public
  */
  tagName: 'div',

  /**
    @property classNames
    @type {String}
    @default ['loading-spinner']
    @public
  */
  classNames: ['loading-spinner']

});
