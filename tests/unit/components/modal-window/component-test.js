import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('modal-window', {
  needs: []
});

test('it renders', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});
