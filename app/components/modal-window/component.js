import Ember from 'ember';

/**
  @class ModalWindow
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const body = $('body');
    body.addClass('noScroll');
  },

  willDestroyElement() {
    const body = $('body');
    body.removeClass('noScroll');
  }
});
