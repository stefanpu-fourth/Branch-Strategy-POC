import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForModel('rota-schedule', {
  // Specify the other units that are required for this test.
});

test('calculateShifts', function(assert) {
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      location: "Some Restaurant",
      jobTitle: "Waiter",
      shiftDate: new Date(2015, 0, 1),
      shiftTimes: ['00:00', '05:00', '17:00', '23:00']
    });

    model.calculateShifts();
    var shifts = model.get('shifts');
    assert.equal(shifts.get('length'), 2, 'the correct number of shifts were returned');

    var shiftLocations = [shifts.get('firstObject.location'), shifts.get('lastObject.location')];
    assert.deepEqual(['Some Restaurant', 'Some Restaurant'], shiftLocations, 'the shifts contain the location');

    var shiftJobTitle = [shifts.get('firstObject.jobTitle'), shifts.get('lastObject.jobTitle')];
    assert.deepEqual(['Waiter', 'Waiter'], shiftJobTitle, 'the shifts contain the job title');
  });
});

test('it can detect non-rota days', function(assert) {
  assert.expect(7);

  // Creates the component instance
  var model = this.subject();

  Ember.run(() => {
    model.set('type', 'on');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'off');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'On');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'OFF');
    assert.equal(model.get('isNotRota'), false);
    model.set('type', 'Xon');
    assert.equal(model.get('isNotRota'), true);
    model.set('type', 'Xoff');
    assert.equal(model.get('isNotRota'), true);
    model.set('type', 'Holiday');
    assert.equal(model.get('isNotRota'), true);
  });
});

test('calculated shift objects can return shift times as minutes', function(assert) {
  assert.expect(4);
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      shiftTimes: ['00:00', '05:00', '17:00', '23:00']
    });

    model.calculateShifts();

    var shifts = model.get('shifts');
    assert.equal(shifts.get('0.startAsMinutes'), 0, 'first shift.startAsMinutes is 0');
    assert.equal(shifts.get('0.endAsMinutes'), 5 * 60, 'first shift.endAsMinutes is 5 * 60');
    assert.equal(shifts.get('1.startAsMinutes'), 17 * 60, 'second shift.startAsMinutes is 17 * 60');
    assert.equal(shifts.get('1.endAsMinutes'), 23 * 60, 'second shift.endAsMinutes is 23 * 60');
  });
});

test('overlapping shifts are detected', function(assert) {
  assert.expect(20);
  var model = this.subject();

  Ember.run(() => {
    model.setProperties({
      shiftTimes: ['00:00', '06:00', '08:00', '12:00']
    });
    model.calculateShifts();

    var overlaps = model.get('overlappingShifts');
    assert.equal(overlaps.length, 0, 'non-overlapping shifts are not found');

    model.setProperties({
      shiftTimes: ['00:00', '06:00', '05:00', '12:00']
    });
    model.calculateShifts();

    overlaps = model.get('overlappingShifts');
    assert.equal(overlaps.length, 1, 'detects a single overlap');
    var overlap = overlaps[0];

    var firstShift = model.get('shifts.0');
    var secondShift = model.get('shifts.1');
    assert.equal(overlap.startAsMinutes, secondShift.get('startAsMinutes'), 'correct start of overlap period found');
    assert.equal(overlap.endAsMinutes, firstShift.get('endAsMinutes'), 'correct end of overlap period found');
    assert.ok(overlap.shifts.indexOf(firstShift) !== -1, 'first shift identified as being in overlap');
    assert.ok(overlap.shifts.indexOf(secondShift) !== -1, 'second shift idenfitied as being in overlap');

    model.setProperties({
      shiftTimes: ['00:00', '06:00', '05:00', '12:00', '07:00', '11:00', '10:00', '13:00', '14:00', '15:00']
    });
    model.calculateShifts();

    overlaps = model.get('overlappingShifts');
    assert.equal(overlaps.length, 3, 'with second set of shift times we have three overlaps');
    // first overlap will include shift 0 and 1
    var shifts = model.get('shifts');
    var overlapShifts = overlaps[0].shifts;
    assert.ok(overlapShifts.indexOf(shifts[0]) !== -1, 'complex overlaps, first shift in first overlap');
    assert.ok(overlapShifts.indexOf(shifts[1]) !== -1, 'complex overlaps, second shift in first overlap');
    overlapShifts = overlaps[1].shifts;
    assert.ok(overlapShifts.indexOf(shifts[0]) === -1, 'complex overlaps, first shift not in second overlap');
    assert.ok(overlapShifts.indexOf(shifts[1]) !== -1, 'complex overlaps, second shift in second overlap');
    assert.ok(overlapShifts.indexOf(shifts[2]) !== -1, 'complex overlaps, third shift in second overlap');
    assert.ok(overlapShifts.indexOf(shifts[3]) !== -1, 'complex overlaps, fourth shift in second overlap');
    overlapShifts = overlaps[2].shifts;
    assert.ok(overlapShifts.indexOf(shifts[0]) === -1, 'complex overlaps, first shift not in third overlap');
    assert.ok(overlapShifts.indexOf(shifts[1]) === -1, 'complex overlaps, second shift not in third overlap');
    assert.ok(overlapShifts.indexOf(shifts[2]) !== -1, 'complex overlaps, third shift in third overlap');
    assert.ok(overlapShifts.indexOf(shifts[3]) !== -1, 'complex overlaps, fourth shift in third overlap');

    // no overlaps include the fifth shift
    overlapShifts = [];
    overlaps.forEach(o => overlapShifts.concat(o.shifts));
    assert.notEqual(shifts[4], undefined, 'fourth shift is there');
    assert.equal(overlapShifts.indexOf(shifts[4]), -1, 'complex overlaps, fourth shift is not in any of the overlaps');

    model.setProperties({
      shiftTimes: ['00:00', '06:00', '00:00', '06:00', '08:00', '12:00', '08:00', '12:00']
    });
    model.calculateShifts();

    overlaps = model.get('overlappingShifts');
    assert.equal(overlaps.length, 2, 'we can detect precisely overlapping shifts');
  });
});
