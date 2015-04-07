import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('swipe-container', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('transitionEvents returns a string of namespace vendor prefixed events', function (assert) {
  assert.expect(1);

  var component = this.subject();
  var namespace = Ember.guidFor(component);
  var expected = `transitionend.${namespace} webkitTransitionEnd.${namespace} oTransitionEnd.${namespace} MSTransitionEnd.${namespace}`;

  assert.equal(component.get('transitionEvents'), expected, 'transitionEvents returns the expected string');
});
