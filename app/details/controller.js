import Ember from 'ember';

/**
  @class DetailsController
  @extends Ember.Route
  @module Details
*/
export default Ember.Controller.extend({
  attrs: {},

  /**
    @property employment
    @type {Any}
    @public
  */
  employment: Ember.computed.alias('attrs.employment.firstObject'),

  /**
    @property selectedForEdit
    @type {String}
    @default 'name'
    @public
  */
  selectedForEdit: 'name',

  /**
    @property isModalOpen
    @type {Boolean}
    @default false
    @public
  */
  isModalOpen: false,

  actions: {
    /**
      Sets selected detail for edition and opens edit modal.

      @method focusIn
      @param {String} selected
      @public
    */
    edit(selected) {
      this.set('selectedForEdit', selected);
      this.set('isModalOpen', true);
    }
  }
});
