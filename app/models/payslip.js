import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var Payslip = DS.Model.extend({
  accountName: attr('string'),
  companyName: attr('string'),
  currentGrossPay: attr('number'),
  netPay: attr('number'),
  processingDate: attr('string'),

  payslipElements: DS.hasMany('payslipElement'),

  grossPay: Ember.computed.alias('currentGrossPay'),

  formattedProcessingDate: function () {
    return moment(this.get('processingDate')).format('DD MMM');
  }.property('processingDate')
});

export default Payslip;
