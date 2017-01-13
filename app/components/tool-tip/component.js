import Ember from 'ember';

/**
  @class ToolLip
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  tagName: 'span',

  classNameBindings: [':tool-tip','active:-active']
});
