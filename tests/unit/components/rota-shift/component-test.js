import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('rota-shift', {
  needs: ['component:tool-tip', 'component:svg-icon']
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
  component.set('shift', { start: '00:00' });
  assert.equal(component.get('startPercent'), 0);
  component.set('shift', { start: '12:00' });
  assert.equal(component.get('startPercent'), 50);
});

test('it can calculate a duration percent', function(assert) {
  assert.expect(4);

  // Creates the component instance
  var component = this.subject();

  component.set('shift', { start: '00:00', end: '12:00' });
  assert.equal(component.get('durationPercent'), 50);
  component.set('shift', { start: '12:00', end: '18:00' });
  assert.equal(component.get('durationPercent'), 25);

  component.set('shift', { start: '18:00', end: '00:00' });
  assert.equal(component.get('durationPercent'), 25);

  // if end-time goes beyond 00:00 then we now clamp to midnight
  component.set('shift', { start: '21:00', end: '03:00' });
  assert.equal(component.get('durationPercent'), 12.5);
});
