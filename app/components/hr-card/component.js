import Ember from 'ember';

/**
  @class HrCard
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  /**
    tagName
    @type {String}
    @default div
    @public
  */
  tagName: 'div',

  /**
    @property classNames
    @type {Array}
    @default ['hr-card', 'brand-bg']
    @public
  */
  classNames: ['hr-card', 'brand-bg']
});
