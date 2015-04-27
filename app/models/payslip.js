import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;
var computed = Ember.computed;
var filterBy = computed.filterBy;

var Payslip = DS.Model.extend({
  accountName: attr('string'),
  companyName: attr('string'),
  currentGrossPay: attr('number'),
  employeePension: attr('number'), //TODO: confirm with Anya
  employerSHPTotal: attr('number'), //TODO: confirm with Anya
  grossNIContribution: attr('number'), //TODO: Confirm with Anya
  grossTaxable: attr('number'),
  netPay: attr('number'),
  processingDate: attr('string'),

  payslipElements: DS.hasMany('payslipElement'),

  grossPay: computed.alias('currentGrossPay'),
  payments: filterBy('payslipElements', 'category', 'Payment'),
  deductions: filterBy('payslipElements', 'category', 'Deduction'),

  totalDeductions: function () {
    var props = this.getProperties('grossPay', 'netPay');
    return (props.grossPay - props.netPay).toFixed(2);
  }.property('grossPay', 'netPay'),

  formattedProcessingDate: function () {
    return moment(this.get('processingDate')).format('DD MMM');
  }.property('processingDate')
});

export default Payslip;
