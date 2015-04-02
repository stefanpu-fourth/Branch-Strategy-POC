import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'payslip__pie card__flipme' ],

  netPay: null,
  grossPay: null,
  index: null,
  selectedIndex: null,

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  takeHome: function () {
    var props = this.getProperties('grossPay', 'netPay');
    return (1 / props.grossPay) * props.netPay;
  }.property('grossPay', 'netPay'),

  didInsertElement: function () {
    var takeHome = this.get('takeHome');

    var el = this.element;
    var path = el.querySelector('.payslip__chartpath');

    var circumference = path.getTotalLength();
    var dashOffset = circumference - (circumference * takeHome);
    var strokeStyles = `stroke-dasharray:${circumference} ${circumference};stroke-dashoffset:${circumference}`;

    //set the pre-animated-styles
    path.style.cssText = strokeStyles;

    Ember.run.next(() => {
      path.style.strokeDashoffset = dashOffset;
    });
  }
});
