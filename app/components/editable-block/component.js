import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['editable-block'],

  actions: {
    clickToEdit(referrer) {
      this.get('edit')(referrer);
    }
  }
});
