import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payslip__pie', 'card__flipme'],

  netPay: null,
  grossPay: null,
  isActive: null,

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
    } else {
      dashOffset = circumference;
    }

    return `stroke-dasharray: ${circumference}px, ${circumference}px; stroke-dashoffset: ${dashOffset}px;`.htmlSafe();
  }.property('isActive', 'takeHome')
});
