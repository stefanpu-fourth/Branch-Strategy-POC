import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'payslip__pie card__flipme' ],
  classNameBindings: [ 'isActive:card--active' ],

  netPay: null,
  grossPay: null,
  index: null,
  selectedIndex: null,

  takeHome: function () {
    var props = this.getProperties('grossPay', 'netPay');
    return (1 / props.grossPay) * props.netPay;
  }.property('grossPay', 'netPay'),

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

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
    }
    else {
      dashOffset = circumference;
    }

    return `stroke-dasharray:${circumference} ${circumference};stroke-dashoffset:${dashOffset}`.htmlSafe();
  }.property('isActive')
});
