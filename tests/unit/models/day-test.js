import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Day from '../../../models/day';

let store;

moduleFor('model:day', 'Unit | Model | day', {
  // Specify the other units that are required for this test.
  needs: ['model:rota-schedule'],

  beforeEach: function() {
    let container = this.container;
    store = container.lookup('service:store');
  }
});

function makeSchedule(shiftTimes = [], rawDate = Date.now()) {
  let date = moment(rawDate).startOf('day');
  let keys = ['jobTitle', 'type', 'location'];
  let rawSchedule = { shiftTimes };

  keys.forEach((key) => rawSchedule[key] = key);
  rawSchedule.shiftDate = date.format('YYYY-MM-DD');
  rawSchedule.rotaStart = date.clone().startOf('week').format('YYYY-MM-DD');

  return store.createRecord('rota-schedule', rawSchedule);
}

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('daysFromSchedules can interpret a schedule record and make a day', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule()]);
    let day = days[0];
    let displayTypes = day.get('displayTypes');

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 0, 'No shifts in day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.ok(day.get('hasDisplayableType'), 'Day has a displayable type');
    assert.equal(displayTypes.length, 1, 'Single displayTypes found');
    assert.equal(displayTypes[0], 'type', 'Type is as expected');
  });
});

test('daysFromSchedules will make a single day from multiple rota-schedule records', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule(), makeSchedule()]);
    let day = days[0];
    let displayTypes = day.get('displayTypes');

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 0, 'No shifts in day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.ok(day.get('hasDisplayableType'), 'Day has a displayable type');
    assert.equal(displayTypes.length, 1, 'Single displayTypes found');
    assert.equal(displayTypes[0], 'type', 'Type is as expected');
  });
});

test('daysFromSchedules can make a day containing shifts', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37'])]);
    let day = days[0];
    let shift = day.shifts[0];
    let displayTypes = day.get('displayTypes');

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 1, 'Single shift in day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.ok(!day.get('hasDisplayableType'), 'As day has a shift, no displayTypes found');
    assert.equal(shift.get('startAsMinutes'), 30, 'Shift start is correct');
    assert.equal(shift.get('endAsMinutes'), 97, 'Shift end is correct');
  });
});

test('daysFromSchedules can make a day containing shifts from multiple records', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule(), makeSchedule(['00:30', '01:37'])]);
    let day = days[0];
    let shift = day.shifts[0];
    let displayTypes = day.get('displayTypes');

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 1, 'Single shift in day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.equal(displayTypes.length, 1, 'As day has a shift, one displayTypes value found');
    assert.equal(shift.get('startAsMinutes'), 30, 'Shift start is correct');
    assert.equal(shift.get('endAsMinutes'), 97, 'Shift end is correct');
  });
});

test('daysFromSchedules can make a day containing overlapping shifts from a single schedule', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37', '01:00', '02:00'])]);
    let day = days[0];
    let overlaps = day.get('overlappingShifts');
    let overlap = overlaps[0];

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 2, 'Two shifts in day');
    assert.equal(overlaps.length, 1, 'One overlaps in day');
    assert.equal(overlap.startAsMinutes, 60, 'Overlap starts at 01:00');
    assert.equal(overlap.endAsMinutes, 97, 'Overlap ends at 01:37');
    assert.ok(!day.get('hasDisplayableType'), 'As schedules for the day had shifts, no displayable types found');
  });
});

test('daysFromSchedules can make a day containing overlapping shifts from multiple schedules', function(assert) {
  assert.expect(6);

  Ember.run(() => {
    let days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37', '04:00', '05:00']), makeSchedule(['01:00', '02:00'])]);
    let day = days[0];
    let overlaps = day.get('overlappingShifts');
    let overlap = overlaps[0];

    assert.equal(days.length, 1, 'Single day created');
    assert.equal(day.shifts.length, 3, 'Three shifts in day');
    assert.equal(overlaps.length, 1, 'One overlaps in day');
    assert.equal(overlap.startAsMinutes, 60, 'Overlap starts at 01:00');
    assert.equal(overlap.endAsMinutes, 97, 'Overlap ends at 01:37');
    assert.ok(!day.get('hasDisplayableType'), 'As schedules for the day had shifts, no displayable types found');
  });
});

test('daysFromSchedules makes multiple days', function(assert) {
  assert.expect(5);

  Ember.run(() => {
    let days = Day.daysFromSchedules([
      makeSchedule([], '2015-01-01'),
      makeSchedule([], '2015-01-02'),
      makeSchedule([], '2015-01-02'),
      makeSchedule([], '2015-01-03')
    ]);
    let day = days[2];

    assert.equal(days.length, 3, 'Three days created');
    assert.equal(day.shifts.length, 0, 'No shifts in final day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.ok(day.get('hasDisplayableType'), 'As schedules for the day had no shifts, displayable types found');
    assert.equal(day.get('displayTypes.0'), 'type', 'Type of final day is as expected');
  });
});
