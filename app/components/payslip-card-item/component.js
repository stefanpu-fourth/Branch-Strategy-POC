import Ember from 'ember';
import CardItemMixin from 'ess/mixins/card-item';

export default Ember.Component.extend(CardItemMixin, {
  classNames: ['payslip'],

  formattedProcessingDate: function() {
    return moment(this.get('payslip.processingDate')).format('ddd Do MMM YYYY');
  }.property('payslip.processingDate')
});
