import Ember from 'ember';
import i18n from 'ess/i18n';

var formattedCurrencyProperty = function(unformattedProp, currencySymbolProp) {
  return Ember.computed(unformattedProp, function() {
    return i18n.toCurrency(this.get(unformattedProp), { unit: this.get(currencySymbolProp) });
  });
};

export default Ember.Component.extend({
  classNames: ['payslip__pie', 'card__flipme'],

  netPay: null,
  grossPay: null,
  isActive: null,

  currencySymbol: '£',

  formattedNetPay: formattedCurrencyProperty('netPay', 'currencySymbol'),

  formattedGrossPay: formattedCurrencyProperty('grossPay', 'currencySymbol'),

  takeHome: function () {
    var props = this.getProperties('grossPay', 'netPay');
    return (1 / props.grossPay) * props.netPay;
  }.property('grossPay', 'netPay'),

  pathStyles: function () {
    var isActive = this.get('isActive');
    var el = this.element;
    var path = el.querySelector('.payslip__chartpath');
    var circumference = path.getTotalLength();
    var dashOffset;
    var takeHome;

    if (isActive) {
      takeHome = this.get('takeHome');
      dashOffset = circumference - (circumference * takeHome);
      if (dashOffset<0) {
        dashOffset=0;
      }
    } else {
      dashOffset = circumference;
    }

    return `stroke-dasharray: ${circumference}px, ${circumference}px; stroke-dashoffset: ${dashOffset}px;`.htmlSafe();
  }.property('isActive', 'takeHome')
});
