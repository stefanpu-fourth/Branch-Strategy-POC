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

// whilst startPercent and durationPercent are now handled by a mixin these tests are still useful
// as they test the mixin is being used correctly
test('it can calculate start percent', function(assert) {
  assert.expect(4);

  // Creates the component instance
  var component = this.subject();

  // 6am will be 25% through the day (midnight to midnight)
  component.set('shift', { startAsMinutes: 6 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('startPercent'), 25);

  // but 6am is 0% through the day if the day starts at 6am
  component.set('shift.meta.dayStartAsMinutes', 6 * 60);
  assert.equal(component.get('startPercent'), 0);

  // plus a 3am start is also at 0% when the day starts at 6am
  component.set('shift.startAsMinutes', 3 * 60);
  assert.equal(component.get('startPercent'), 0);

  // if the day goes from 6am to 6pm, then 12 noon will be at 50%
  component.set('shift', { startAsMinutes: 12 * 60, meta: { dayStartAsMinutes: 6 * 60, dayEndAsMinutes: 18 * 60 } });
  assert.equal(component.get('startPercent'), 50);
});

test('it can calculate a duration percent', function(assert) {
  assert.expect(5);

  // Creates the component instance
  var component = this.subject();

  // make the day start and end at midnight
  component.set('shift', { startAsMinutes: 0, endAsMinutes: 12 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 50);

  component.set('shift', { startAsMinutes: 12 * 60, endAsMinutes: 18 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 25);

  // will work with a midnight end time
  component.set('shift', { startAsMinutes: 18 * 60, endAsMinutes: 0, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 25);

  // if end-time goes beyond dayEnd then we clamp to dayEnd
  component.set('shift', { startAsMinutes: 21 * 60, endAsMinutes: 3 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 12.5);

  // if we shift the dayStart and dayEnd to 3am, then that clamping gets undone
  component.set('shift.meta.dayStartAsMinutes', 3 * 60);
  component.set('shift.meta.dayEndAsMinutes', 3 * 60);
  assert.equal(component.get('durationPercent'), 25);
});
