import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;
var computed = Ember.computed;
var filterBy = computed.filterBy;

var Payslip = DS.Model.extend({
  accountName: attr('string'),
  companyName: attr('string'),
  currentGrossPay: attr('number'),
  employeeAVCToDate: attr('number'),
  employeeFSAVCToDate: attr('number'),
  employeeNumber: attr('string'),
  employeePension: attr('number'),
  employeePensionToDate: attr('number'),
  employerPensionToDate: attr('number'),
  employerSHPTotal: attr('number'),
  grossNIContribution: attr('number'),
  grossNIContributionToDate: attr('number'),
  grossPayForTaxToDate: attr('number'),
  grossPayYearToDate: attr('number'),
  grossTaxable: attr('number'),
  monthWeekNumber: attr('number'),
  nationalInsuranceNumber: attr('string'),
  niContributionToDate: attr('number'),
  netPay: attr('number'),
  paymentMethodDescription: attr('string'),
  payPeriod: attr('string'),
  payPreEmployment: attr('number'),
  processingDate: attr('string'),
  taxCode: attr('string'),
  taxDueToDate: attr('number'),
  taxPreEmployment: attr('number'),
  totalGrossPayToDate: attr('number'),
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
