import Ember from 'ember';

/**
  @class TabbedContainer
  @extends Ember.Component
  @public
*/
export default Ember.Component.extend({
  /**
    @property activeTab
    @type {Object}
    @public
  */
  activeTab: Ember.computed(function () {
    return this.get('tabs').find(tab => tab.active);
  }),

  /**
    @property activeTabComponent
    @type {Object}
    @public
  */
  activeTabComponent: Ember.computed('activeTab', function () {
    return this.get('activeTab').component;
  }),

  /**
    @property activeTabComponentModel
    @type {Object}
    @public
  */
  activeTabComponentModel: Ember.computed('activeTab', function () {
    return this.get('activeTab').componentModel;
  }),

  actions: {
    /**
      Sets the provided tab as active.

      @method setTabActive
      @param {String} tabName
      @public
    */
    setTabActive(tabName) {
      const tab = this.get('tabs').find(tab => tab.name === tabName);
      this.set('activeTab', tab);

      this.$('.tabbed-container__tab--active').removeClass('tabbed-container__tab--active');
      this.$(`#${tabName}-tab`).addClass('tabbed-container__tab--active');
    }
  }
});
