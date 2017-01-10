import Ember from 'ember';

/**
  @class ModalOverlay
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
    @default ['modal-overlay']
    @public
  */
  classNames: ['modal-overlay']

});
