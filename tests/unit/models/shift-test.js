import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Shift from '../../../models/shift';

moduleFor('model:shift', 'Unit | Model | shift', {
  // Specify the other units that are required for this test.
  needs: []
});

function checkShifts(assert, shiftTimes, schedule, count) {
  let shifts = Shift.shiftsFromSchedule(schedule);
  assert.equal(shifts.length, count, 'Correct number of shifts returned for count ' + count);
  shifts.forEach((shift, index) => {
    assert.equal(shift.get('start'), shiftTimes[index * 2], 'Start time as expected');
    assert.equal(shift.get('end'), shiftTimes[(index * 2) + 1], 'End time as expected');
  });
  return shifts;
}

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('shift objects can return shift times as minutes', function(assert) {
  assert.expect(4);
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      start: '00:00',
      end: '05:00'
    });

    assert.equal(model.get('startAsMinutes'), 0, 'startAsMinutes for 00:00 is 0');
    assert.equal(model.get('endAsMinutes'), 5 * 60, 'endAsMinutes for 05:00 is 5 * 60');

    model.setProperties({
      start: '17:24',
      end: '23:00'
    });

    assert.equal(model.get('startAsMinutes'), (17 * 60) + 24, 'startAsMinutes for 17:24 is (17 * 60) + 24');
    assert.equal(model.get('endAsMinutes'), 23 * 60, 'endAsMinutes for 23:00 is 23 * 60');
  });
});

test("shiftsFromSchedule will return empty array when there's no shiftTimes", function(assert) {
  assert.expect(2);

  let shifts = Shift.shiftsFromSchedule(Ember.Object.create());

  assert.equal(shifts.length, 0, 'No shifts for a null schedule');

  shifts = Shift.shiftsFromSchedule(Ember.Object.create({ shiftTimes: [] }));

  assert.equal(shifts.length, 0, 'No shifts for a schedule with empty shiftTimes');
});

test('shiftsFromSchedule correctly creates shifts interpreting shiftTimes array', function(assert) {
  assert.expect(6);

  let shiftTimes = ['00:00', '01:00'];
  let keys = ['jobTitle', 'type', 'location'];
  let rawSchedule = { shiftTimes };
  keys.forEach((key) => rawSchedule[key] = key);
  let schedule = Ember.Object.create(rawSchedule);

  let shift = checkShifts(assert, shiftTimes, schedule, 1)[0];

  keys.forEach((key) => {
    assert.equal(shift[key], schedule[key], key + ' matches');
  });
});

test('shiftsFromSchedule correctly interprets multiple shiftTimes', function(assert) {
  assert.expect(29);

  let shiftTimes = ['00:00', '01:00'];
  let keys = ['jobTitle', 'type', 'location'];
  let rawSchedule = { shiftTimes };
  keys.forEach((key) => rawSchedule[key] = key);
  let schedule = Ember.Object.create(rawSchedule);

  shiftTimes.push('02:00', '03:00');
  let shifts = checkShifts(assert, shiftTimes, schedule, 2);

  // ensure that shifts have other populated values too
  shifts.forEach((shift) => {
    keys.forEach((key) => {
      assert.equal(shift[key], schedule[key], key + ' matches');
    });
  });

  shiftTimes.push('04:00', '05:00');
  checkShifts(assert, shiftTimes, schedule, 3);

  shiftTimes.push('06:00', '07:00', '08:00', '09:00');
  checkShifts(assert, shiftTimes, schedule, 5);
});

test('shiftsFromSchedule is tolerant of dodgy data', function(assert) {
  assert.expect(5);

  let shiftTimes = ['00:00', '01:00', '02:00'];
  let schedule = Ember.Object.create({ shiftTimes });

  checkShifts(assert, shiftTimes, schedule, 2);
});
