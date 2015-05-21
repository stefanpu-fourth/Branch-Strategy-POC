import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['flip-card--front'],

  actions: {
    flipCard: function() {
      this.get('parentView').send('flipCard');
    }
  }
});
