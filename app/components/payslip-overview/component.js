import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['payslip-overview'],

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  actions: {
    flipCard: function(button) {
      if (button) {
        ga('send', 'event', 'payslip', 'click', 'Payslip breakdown');
      }
      this.get('parentView').send('flipCard');
    },
    downloadPayslip: function() {
      ga('send', 'event', 'payslip', 'click', 'Download payslip');
      return false;
    }
  }
});
