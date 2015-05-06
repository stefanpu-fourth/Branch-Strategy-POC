import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['flip-card--back'],

  actions: {
    flipCard: function() {
      this.get('parentView').send('flipCard');
    }
  }
});
