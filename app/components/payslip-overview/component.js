import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['payslip-overview'],

  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  actions: {
    flipCard: function(button) {
      if (button) {
        ga('send', 'event', 'payslip', 'click', 'Payslip breakdown');
      }
      this.get('parentView').send('flipCard');
    },
    downloadPayslip: function(href) {
      ga('send', 'event', 'payslip', 'click', 'Download payslip');
      var redirectParam = 'redirect=' + encodeURIComponent(window.location.href);
      // In principle the href for the payslip won't include any query params, but let's be safe
      var joinChar = '?';
      if (href.indexOf('?') !== -1) {
        joinChar = '&';
      }
      location.href = [href, redirectParam].join(joinChar);
      return true;
    }
  }
});
