import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['payslip-overview'],

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  formattedProcessingDate: function() {
    return moment(this.get('payslip.processingDate')).format('ddd Do MMM YYYY');
  }.property('payslip.processingDate')
});
