import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payslip-donut-chart'],

  netPay: null,
  grossPay: null,
  isActive: null,
  hasRendered: false,

  takeHome: function () {
    var props = this.getProperties('grossPay', 'netPay');
    return (1 / props.grossPay) * props.netPay;
  }.property('grossPay', 'netPay'),

  pathStyles: function () {
    var isActive = this.get('isActive');
    var el = this.element;
    var path, circumference, dashOffset, takeHome;

    if (el) {
      path = el.querySelector('.payslip-donut-chart--path');
      circumference = path.getTotalLength();
      if (isActive) {
        takeHome = this.get('takeHome');
        dashOffset = circumference - (circumference * takeHome);
        if (dashOffset < 0) {
          dashOffset = 0;
        }
      } else {
        dashOffset = circumference;
      }
    } else {
      // we have no element yet - but as our donut is a fixed element we know our dimensions already so bodge
      circumference = 903.125;
      dashOffset = 903.125;
    }

    return `stroke-dasharray: ${circumference}px, ${circumference}px; stroke-dashoffset: ${dashOffset}px;`.htmlSafe();
  }.property('isActive', 'takeHome', 'hasRendered'),

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', () => {
      this.set('hasRendered', true);
    });
  },

  actions: {
    flipCard: function() {
      ga('send', 'event', 'payslip', 'click', 'Donut');
      this.get('parentView').send('flipCard', false);
    }
  }
});
