import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  employment: Ember.computed.alias('attrs.employment.firstObject'),
  
  selectedForEdit: 'name',

  actions: {
    edit(selected) {
      this.set('selectedForEdit', selected);
      this.transitionToRoute('details.edit');
    }
  }
});
