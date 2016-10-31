import Ember from 'ember';

export default Ember.Component.extend({
  activeTabItem: Ember.computed(function() {
    return this.get('tabs').find((tab) => tab.active).tabContent;
  }),
  
  actions: {
    setSelectedTab(tabName) {
      this.$('.tabbed-container__tab--active').removeClass('tabbed-container__tab--active');
      this.$(`#${tabName}-tab`).addClass('tabbed-container__tab--active');
      this.set('activeTabItem', tabName + '-edit-form');
    }
  }
});
