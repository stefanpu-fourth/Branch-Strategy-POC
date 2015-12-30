import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Day from '../../../models/day';

let store;

moduleFor('model:day', 'Unit | Model | day', {
  // Specify the other units that are required for this test.
  needs: ['model:rota-schedule'],

  beforeEach: function() {
    const container = this.container;
    store = container.lookup('service:store');
  }
});

function makeSchedule(shiftTimes = [], rawDate = Date.now()) {
  const date = moment(rawDate).startOf('day');
  const keys = ['jobTitle', 'type', 'location'];
  const rawSchedule = { shiftTimes };

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
    const days = Day.daysFromSchedules([makeSchedule()]);
    const day = days[0];
    const displayTypes = day.get('displayTypes');

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
    const days = Day.daysFromSchedules([makeSchedule(), makeSchedule()]);
    const day = days[0];
    const displayTypes = day.get('displayTypes');

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
    const days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37'])]);
    const day = days[0];
    const shift = day.shifts[0];
    const displayTypes = day.get('displayTypes');

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
    const days = Day.daysFromSchedules([makeSchedule(), makeSchedule(['00:30', '01:37'])]);
    const day = days[0];
    const shift = day.shifts[0];
    const displayTypes = day.get('displayTypes');

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
    const days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37', '01:00', '02:00'])]);
    const day = days[0];
    const overlaps = day.get('overlappingShifts');
    const overlap = overlaps[0];

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
    const days = Day.daysFromSchedules([makeSchedule(['00:30', '01:37', '04:00', '05:00']), makeSchedule(['01:00', '02:00'])]);
    const day = days[0];
    const overlaps = day.get('overlappingShifts');
    const overlap = overlaps[0];

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
    const days = Day.daysFromSchedules([
      makeSchedule([], '2015-01-01'),
      makeSchedule([], '2015-01-02'),
      makeSchedule([], '2015-01-02'),
      makeSchedule([], '2015-01-03')
    ]);
    const day = days[2];

    assert.equal(days.length, 3, 'Three days created');
    assert.equal(day.shifts.length, 0, 'No shifts in final day');
    assert.equal(day.get('overlappingShifts.length'), 0, 'No overlaps in day');
    assert.ok(day.get('hasDisplayableType'), 'As schedules for the day had no shifts, displayable types found');
    assert.equal(day.get('displayTypes.0'), 'type', 'Type of final day is as expected');
  });
});

test('daysFromSchedules merges days with correctly sorted shifts', function(assert) {
  assert.expect(11);

  Ember.run(() => {
    const days = Day.daysFromSchedules([
      makeSchedule(['17:00', '18:00'], '2015-03-03'),
      makeSchedule([], '2015-01-01'),
      makeSchedule(['19:00', '22:00'], '2015-03-03'),
      makeSchedule(['11:00', '12:00'], '2015-03-03'),
      makeSchedule(['07:00', '09:00'], '2016-01-01')
    ]);
    let day = days[0];
    let shifts = day.shifts;

    // NB days returned are not sorted, but will instead be in the order they first appear
    // hence why we're looking for day zero being 2015-03-03

    assert.equal(days.length, 3, 'Three days created');
    assert.equal(day.get('shiftDate'), '2015-03-03', 'Date is 2015-03-03 as expected');
    assert.equal(shifts.length, 3, 'Three shifts found on day');
    assert.equal(shifts[0].start, '11:00', 'First shift has correct start time');
    assert.equal(shifts[1].start, '17:00', 'Second shift start is as expected');
    assert.equal(shifts[2].start, '19:00', 'Third shift start looks right too');

    day = days[1];
    assert.equal(day.get('shiftDate'), '2015-01-01', 'Date is 2015-01-01 as expected');
    assert.equal(day.shifts.length, 0, 'No shifts found on day');

    day = days[2];
    shifts = day.shifts;
    assert.equal(day.get('shiftDate'), '2016-01-01', 'Date is 2016-01-01 as expected');
    assert.equal(shifts.length, 1, 'Single shift found on day');
    assert.equal(shifts[0].start, '07:00', 'Shift on final day starts as expected');
  });
});
