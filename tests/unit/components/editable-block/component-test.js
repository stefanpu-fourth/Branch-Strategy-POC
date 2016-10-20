import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';

moduleForComponent('editable-block', {
  needs: [
    'helper:t',
    'component:svg-icon',
    'service:appStateService',
    'template:partials/icons/edit'
  ],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Create the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});
