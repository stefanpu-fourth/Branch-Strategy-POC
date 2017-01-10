import Ember from 'ember';

/**
  @class DetailsController
  @extends Ember.Controller
  @module Details
*/
export default Ember.Controller.extend({
  attrs: {},

  /**
    @property employment
    @type {Object}
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

      @method edit
      @param {String} selected
      @public
    */
    edit(selected) {
      this.set('selectedForEdit', selected);
      this.set('isModalOpen', true);
    }
  }
});
