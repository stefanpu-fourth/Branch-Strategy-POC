import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['card', 'payslip'],
  line: null,
  flipped: false,

  actions: {
    flip: function () {
      this.toggleProperty('flipped');
    }
  }
});
