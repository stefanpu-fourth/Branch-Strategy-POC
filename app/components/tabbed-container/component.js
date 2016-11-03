import Ember from 'ember';

export default Ember.Component.extend({
  activeTab: Ember.computed(function() {
    return this.get('tabs').find(tab => tab.active);
  }),
  activeTabComponent: Ember.computed(function() {
    return this.get('activeTab').component;
  }),
  activeTabComponentModel: Ember.computed(function() {
    return this.get('activeTab').componentModel;
  }),

  actions: {
    setTabActive(tabName) {
      const tab = this.get('tabs').find(tab => tab.name === tabName);
      this.set('activeTabComponent', tab.component);
      this.set('activeTanComponentModel', tab.componentModel);

      this.$('.tabbed-container__tab--active').removeClass('tabbed-container__tab--active');
      this.$(`#${tabName}-tab`).addClass('tabbed-container__tab--active');
    }
  }
});
