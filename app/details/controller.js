import Ember from 'ember';

export default Ember.Controller.extend({
  attrs: {},

  employment: Ember.computed.alias('attrs.employment.firstObject'),

  selectedForEdit: 'name',

  isModalOpen: false,

  actions: {
    edit(selected) {
      this.set('selectedForEdit', selected);
      this.set('isModalOpen', true);
    }
  }
});
