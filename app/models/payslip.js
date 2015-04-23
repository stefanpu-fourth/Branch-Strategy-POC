import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var Payslip = DS.Model.extend({
  grossPay: Ember.computed.alias('currentGrossPay'),
  netPay: attr('number'),
  processingDate: attr('string'),

  currentGrossPay: attr('number'),

  formattedProcessingDate: function () {
    return moment(this.get('processingDate')).format('DD MMM');
  }.property('processingDate'),

  payslipElements: DS.hasMany('payslipElement')
});

export default Payslip;
