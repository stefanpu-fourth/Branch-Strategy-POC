import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['payslip-detail'],

  formattedProcessingDate: function() {
    return moment(this.get('payslip.processingDate')).format('ddd Do MMM YYYY');
  }.property('payslip.processingDate')
});
