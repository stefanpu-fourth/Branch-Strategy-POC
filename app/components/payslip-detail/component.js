import Ember from 'ember';

var notEmpty = Ember.computed.notEmpty;

/**
  @class PayslipDetail
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property tagName
    @type {String}
    @default section
    @public
  */
  tagName: 'section',

  /**
    @property classNames
    @type {String}
    @default ['payslip-detail']
    @public
  */
  classNames: ['payslip-detail'],
  /**
    @property payslip
    @type {DS.Model}
    @default null
    @public
  */
  payslip: null,
  showEmployerPensionContribution: notEmpty('payslip.employerPensionContributionHeader'),
  showEmployerPensionToDate: notEmpty('payslip.employerPensionContributionHeaderYearToDate'),
  showEmployeePensionToDate: notEmpty('payslip.employeePensionContributionHeaderYearToDate')
});
