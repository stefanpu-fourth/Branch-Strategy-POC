import Ember from 'ember';

/**
  @class EditableBlock
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property classNames
    @type {Array}
    @default ['editable-block']
    @public
  */
  classNames: ['editable-block'],

  actions: {
    /**
      Opens modal window for edit, depending on referrer

      @method clickToEdit
      @param {String} referrer
      @public
    */
    clickToEdit(referrer) {
      this.get('edit')(referrer);
    }
  }
});
