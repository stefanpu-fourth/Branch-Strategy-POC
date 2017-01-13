import Ember from 'ember';

/**
  @class HrEmployee
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({

  /**
    @property tagName
    @type {String}
    @default section
    @public
  */
  tagName: 'section',

  /**
    @property classNames
    @type {Array}
    @default ['hr-employee']
    @public
  */
  classNames: ['hr-employee']
});
