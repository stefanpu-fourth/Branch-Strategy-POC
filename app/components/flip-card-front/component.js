import Ember from 'ember';

/**
  @class FlipCardFront
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
    @default ['flip-card--front']
    @public
  */
  classNames: ['flip-card--front'],

  actions: {
    /**
      Calls 'flipCard' action in 'flip-card' component

      @method flipCard
      @public
    */
    flipCard: function() {
      this.get('parentView').send('flipCard');
    }
  }
});
