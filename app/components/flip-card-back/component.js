import Ember from 'ember';

/**
  @class FlipCardBack
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
    @default ['flip-card--back']
    @public
  */
  classNames: ['flip-card--back'],

  actions: {
    /**
      Calls "flipCard" action in 'flip-card' compoponent.

      @method flipCard
      @public
    */
    flipCard: function() {
      this.get('parentView').send('flipCard');
    }
  }
});
