import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  classNames: ['tool-tip'],

  classNameBindings: ['active:-active']
});
