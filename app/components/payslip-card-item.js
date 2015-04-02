import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['card', 'payslip'],
  line: null,
  index: null,
  selectedIndex: null
});
