import Ember from 'ember';
import RotaBarItemMixin from '../../../mixins/rota-bar-item';
import { module, test } from 'qunit';

module('Unit | Mixin | rota bar item');

// Replace this with your real tests.
test('it works', function(assert) {
  var RotaBarItemObject = Ember.Object.extend(RotaBarItemMixin);
  var subject = RotaBarItemObject.create();
  assert.ok(subject);
});

test('it can calculate start percent', function(assert) {
  assert.expect(4);

  // Creates the component instance
  var component = Ember.Object.extend(RotaBarItemMixin).create();

  // 6am will be 25% through the day (midnight to midnight)
  component.setProperties({ startAsMinutes: 6 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('startPercent'), 25);

  // but 6am is 0% through the day if the day starts at 6am
  component.set('meta.dayStartAsMinutes', 6 * 60);
  assert.equal(component.get('startPercent'), 0);

  // plus a 3am start is also at 0% when the day starts at 6am
  component.set('startAsMinutes', 3 * 60);
  assert.equal(component.get('startPercent'), 0);

  // if the day goes from 6am to 6pm, then 12 noon will be at 50%
  component.setProperties({ startAsMinutes: 12 * 60, meta: { dayStartAsMinutes: 6 * 60, dayEndAsMinutes: 18 * 60 } });
  assert.equal(component.get('startPercent'), 50);
});

test('it can calculate a duration percent', function(assert) {
  assert.expect(5);

  // Creates the component instance
  var component = Ember.Object.extend(RotaBarItemMixin).create();

  // make the day start and end at midnight
  component.setProperties({ startAsMinutes: 0, endAsMinutes: 12 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 50);

  component.setProperties({ startAsMinutes: 12 * 60, endAsMinutes: 18 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 25);

  // will work with a midnight end time
  component.setProperties({ startAsMinutes: 18 * 60, endAsMinutes: 0, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 25);

  // if end-time goes beyond dayEnd then we clamp to dayEnd
  component.setProperties({ startAsMinutes: 21 * 60, endAsMinutes: 3 * 60, meta: { dayStartAsMinutes: 0, dayEndAsMinutes: 0 } });
  assert.equal(component.get('durationPercent'), 12.5);

  // if we shift the dayStart and dayEnd to 3am, then that clamping gets undone
  component.set('meta.dayStartAsMinutes', 3 * 60);
  component.set('meta.dayEndAsMinutes', 3 * 60);
  assert.equal(component.get('durationPercent'), 25);
});
