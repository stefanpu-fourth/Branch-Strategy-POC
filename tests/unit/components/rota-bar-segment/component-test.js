import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('rota-bar-segment', {
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

test('it can calculate start percent', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component.getStartPercent({ start: '0000' }), 0);
  assert.equal(component.getStartPercent({ start: '1200' }), 50);
});

test('it can calculate a duration percent', function(assert) {
  assert.expect(3);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component.getDurationPercent({ start: '0000', end: '1200' }), 50);
  assert.equal(component.getDurationPercent({ start: '1200', end: '1800' }), 25);
  assert.equal(component.getDurationPercent({ start: '2100', end: '0300' }), 25);
});
