import DS from 'ember-data';
import Ember from 'ember';
import i18n from 'ess/i18n';
import config from 'ess/config/environment';

var attr = DS.attr;
var computed = Ember.computed;
var filterBy = computed.filterBy;
var dayMonthFormat = i18n.t('dateFormats.dayMonth');

var Payslip = DS.Model.extend({

  appStateService: Ember.inject.service(),

  address1: attr('string'),
  address2: attr('string'),
  address3: attr('string'),
  address4: attr('string'),
  accountName: attr('string'),      // appears to be obsolete - no longer in spec
  companyName: attr('string'),
  county: attr('string'),
  currentGrossPay: attr('number'),
  employeeAVCToDate: attr('number'),
  employeeFSAVCToDate: attr('number'),
  employeeNumber: attr('string'),
  employeePension: attr('number'),
  employerPensionContribution: attr('number'),
  employerPensionContributionHeader: attr('string'),
  employeePensionToDate: attr('number'),
  employeePensionContributionHeaderYearToDate: attr('string'),
  employerPensionToDate: attr('number'),
  employerPensionContributionHeaderYearToDate: attr('string'),
  employerSHPTotal: attr('number'),
  fullName: attr('string'),
  grossNIContribution: attr('number'),
  grossNIContributionToDate: attr('number'),
  grossPayForTaxToDate: attr('number'),
  grossPayYearToDate: attr('number'),
  grossTaxable: attr('number'),
  jobTitle: attr('string'),
  monthWeekNumber: attr('number'),
  nationalInsuranceCategory: attr('string'),
  nationalInsuranceNumber: attr('string'),
  niContributionToDate: attr('number'),
  employerNIContributionToDate: attr('number'),
  netPay: attr('number'),
  netPayInWords: attr('string'),
  paymentMethodDescription: attr('string'),
  payPeriod: attr('string'),
  payPreEmployment: attr('number'),
  payslipNote: attr('string'),
  postCode: attr('string'),
  processingDate: attr('string'),
  reference: attr('string'),
  studentLoanYearToDate: attr('number'),
  taxCode: attr('string'),
  taxDueToDate: attr('number'),
  taxPreEmployment: attr('number'),
  totalDeductions: attr('number'),
  totalGrossPayToDate: attr('number'),
  totalPayments: attr('number'),
  town: attr('string'),

  payslipElements: DS.hasMany('payslipElement'),

  grossPay: computed.alias('currentGrossPay'),
  payments: filterBy('payslipElements', 'category', 'Payment'),
  deductions: filterBy('payslipElements', 'category', 'Deduction'),

  pdfURL: function () {
    var url = config.apiBaseUrl;
    var employeeId = this.get('appStateService.authenticatedEmployeeId');
    var payslipId = this.get('id');

    return `${url}/employees/${employeeId}/payslips/${payslipId}.pdf`;
  }.property('id', 'appStateService.authenticatedEmployeeId'),

  currentPayPeriod: function () {
    var props = this.getProperties('payPeriod', 'monthWeekNumber');
    return props.payPeriod || props.monthWeekNumber;
  }.property('payPeriod', 'monthWeekNumber'),

  formattedProcessingDate: function () {
    return moment(this.get('processingDate')).format(dayMonthFormat);
  }.property('processingDate')
});

export default Payslip;
