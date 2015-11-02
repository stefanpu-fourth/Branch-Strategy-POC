import Ember from 'ember';

var notEmpty = Ember.computed.notEmpty;

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['payslip-detail'],
  payslip: null,
  showEmployerPensionContribution: notEmpty('payslip.employerPensionContributionHeader'),
  showEmployerPensionToDate: notEmpty('payslip.employerPensionContributionHeaderYearToDate'),
  showEmployeePensionToDate: notEmpty('payslip.employeePensionContributionHeaderYearToDate')
});
