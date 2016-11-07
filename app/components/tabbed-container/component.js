import Ember from 'ember';

export default Ember.Component.extend({
  activeTab: Ember.computed(function() {
    return this.get('tabs').find(tab => tab.active);
  }),
  activeTabComponent: Ember.computed('activeTab', function() {
    return this.get('activeTab').component;
  }),
  activeTabComponentModel: Ember.computed('activeTab', function() {
    return this.get('activeTab').componentModel;
  }),

  actions: {
    setTabActive(tabName) {
      const tab = this.get('tabs').find(tab => tab.name === tabName);
      this.set('activeTab', tab);

      this.$('.tabbed-container__tab--active').removeClass('tabbed-container__tab--active');
      this.$(`#${tabName}-tab`).addClass('tabbed-container__tab--active');
    }
  }
});
