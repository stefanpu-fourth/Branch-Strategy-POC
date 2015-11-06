import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('rota-hour-bar', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
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

test('it calculates style correctly', function(assert) {
  assert.expect(2);

  Ember.run(() => {
    var component = this.subject();
    component.set('startPercent', 0);
    assert.equal(component.get('style'), 'left: 0%');
    component.set('startPercent', 50);
    assert.equal(component.get('style'), 'left: 50%');
  });
});
