import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['flip-card--front'],

  actions: {
    flipCard: function() {
      ga('send', 'event', 'payslip', 'click', 'Payslip breakdown');
      this.get('parentView').send('flipCard');
    }
  }
});
