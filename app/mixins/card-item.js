import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'section',
  classNames: ['card'],
  flipped: false,
  actions: {
    flip: function () {
      this.toggleProperty('flipped');
    }
  }
});
