import Ember from 'ember';

/**
  @class PayslipOverview
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
    @default ['payslip-overview']
    @public
  */
  classNames: ['payslip-overview'],

  /**
    @property isActive
    @type {Boolean}
    @public
  */
  isActive: function () {
    var props = this.getProperties('index', 'selectedIndex');
    return props.index === props.selectedIndex;
  }.property('index', 'selectedIndex'),

  actions: {
    /**
      Calls 'flipCard' action of parent component

      @method flipCard
      @public
    */
    flipCard: function(button) {
      if (button) {
        ga('send', 'event', 'payslip', 'click', 'Payslip breakdown');
      }
      this.get('parentView').send('flipCard');
    },

    /**
      Sends event to Google Analytics

      @method downloadPayslip
      @param {String} href
      @public
    */
    downloadPayslip: function(href) {
      ga('send', 'event', 'payslip', 'click', 'Download payslip');
      location.href = href;
      return true;
    }
  }
});
