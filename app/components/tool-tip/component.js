import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNameBindings: [':tool-tip','active:-active']
});
