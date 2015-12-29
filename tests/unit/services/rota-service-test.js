import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

let store;
let records;

moduleFor('service:rota-service', {
  needs: ['model:rota-schedule'],

  beforeEach: function() {
    const container = this.container;

    store = container.lookup('service:store');
    store.find = sinon.stub().returns(Ember.RSVP.resolve(records));
    records = [];

    // we're starting our shifts from Monday 30th March
    const m = moment(new Date(2015, 2, 30));

    for (let i = 0; i < 35; i++) {
      // rotaStart date needs to be Mondays
      // to get that to work properly, we need to subtract the offset, get the week start, then add that offset
      let rotaStart = m.clone().subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');
      records.push(store.createRecord('rota-schedule', {
        rotaStart: rotaStart,
        shiftDate: m.format('YYYY-MM-DD')
      }));
      m.add(1, 'day');
    }

    store.filter = function(type, filterFunc) {
      return records.filter(filterFunc);
    };
  }
});

test('it groups the rotaSchedule objects into rota weeks', function(assert) {
  const service = this.subject();

  Ember.run(() => {
    let weeks = service.getRotaWeeks(records);

    assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first week is present');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last week is present');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    weeks.forEach(week => {
      let formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);

      // days of week should all have matching rotaStart days
      let startDates = new Set(week.get('days').map(w => w.get('rotaStart')));
      assert.equal(startDates.size, 1, 'all dates within a week match');
    });
  });
});

test('it consolidates days in rota weeks', function(assert) {
  const service = this.subject();

  Ember.run(() => {
    // first up add in a shift on a day
    let record = records.get(4);
    record.shiftTimes = ['07:00', '13:00'];

    let shiftDate = record.get('shiftDate');
    let rotaStart = record.get('rotaStart');

    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['14:00', '15:00']
    }));
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['16:00', '17:00']
    }));

    record = records.get(20);
    shiftDate = record.get('shiftDate');
    rotaStart = record.get('rotaStart');
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['14:00', '15:00']
    }));
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['16:00', '17:00']
    }));

    let weeks = service.getRotaWeeks(records);

    assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first shift is present');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last shift is present');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    weeks.forEach(week => {
      let formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);
    });

    // find day that matching date for last record as that should be consolidated
    let lastRecord = records[records.length - 1];
    shiftDate = lastRecord.get('shiftDateAsMoment');
    let dayFilter = day => shiftDate.isSame(day.get('shiftDateAsMoment'), 'day');

    let recordWeek = service.findWeekForDate(weeks, shiftDate.valueOf());
    let days = recordWeek.days.filter(dayFilter);

    assert.equal(days.length, 1, 'single day for merged shifts found');
    assert.equal(days[0].shifts.length, 2, 'shifts get merged as expected');

    weeks = service.getRotaWeeks(records);
    recordWeek = service.findWeekForDate(weeks, shiftDate);
    days = recordWeek.days.filter(dayFilter);
    assert.equal(days[0].shifts.length, 2, 'shifts merged as expected after second call to getRotaWeeks');
  });
});

test('it can get the next shift when there is one', function(assert) {
  const service = this.subject();

  // add a shift to a record in the future
  let record = records.get(20);
  record.shiftTimes = ['07:00', '13:00'];

  // and add a shift to a record in the past
  record = records.get(1);
  record.shiftTimes = ['06:00', '12:00'];

  let weeks = service.getRotaWeeks(records);
  let fetchedShift = service.getNextShiftFromWeeks(weeks, new Date(2015, 3, 2));

  // fetched shift should be the future one
  assert.equal(fetchedShift.start, '07:00');
  assert.equal(fetchedShift.end, '13:00');
});

test("won't return a next shift when there isn't one", function(assert) {
  const service = this.subject();
  let weeks = service.getRotaWeeks(records);
  let fetchedShift = service.getNextShiftFromWeeks(weeks, new Date(2015, 3, 2));

  assert.equal(fetchedShift, undefined);
});

test("merged schedules correctly sort their shifts", function(assert) {
  const service = this.subject();

  // add a shift to a record late in the day
  let record = records.get(20);
  record.shiftTimes = ['14:00', '20:00'];

  let shiftDate = record.get('shiftDate');
  let rotaStart = record.get('rotaStart');

  Ember.run(() => {
    // add a shift record on the same day with the shift we're searching for
    // this is the shift we'll be looking for

    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['07:00', '12:00']
    }));

    // and add a shift to a record in the past
    record = records.get(1);
    record.shiftTimes = ['06:00', '12:00'];

    let weeks = service.getRotaWeeks(records);
    let fetchedShift = service.getNextShiftFromWeeks(weeks, shiftDate);

    // fetched shift should be one from the merged-in record
    assert.equal(fetchedShift.start, '07:00');
    assert.equal(fetchedShift.end, '12:00');
  });
});

test("if we have the same days but our week starts on Sunday things still work as expected", function(assert) {
  assert.expect(5 + (6 * (2 + 6)));   // 5 tests, plus for each week there's two for the week and 6 for days

  Ember.run(() => {
    // adjust all our records to have their rotaStart days back a day, moving them from Monday to Sunday
    records.forEach(function(shift) {
      let rotaStart = moment(shift.get('shiftDate')).clone().startOf('week');
      shift.set('rotaStart', rotaStart.format('YYYY-MM-DD'));
    });

    const service = this.subject();
    let weeks = service.getRotaWeeks(records);

    let firstWeek = weeks.get('firstObject');
    let lastWeek = weeks.get('lastObject');
    assert.equal(firstWeek.get('start').format('YYYY-MM-DD'), '2015-03-29', 'first week is present, and now starts on Sunday 29 March');
    assert.equal(lastWeek.get('start').format('YYYY-MM-DD'), '2015-05-03', 'last week is present, and now starts on Sunday 3 May');
    // as we've shifted the start day we'll now have an extra week
    assert.equal(weeks.get('length'), 6, 'expected number of rota weeks loaded');

    // new logic means that all weeks should still have 7 days
    weeks.forEach(week => {
      let formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);

      // days of week should all have matching rotaStart days
      let checkDates = new Set(week.get('days').map(w => w.get('rotaStart')));
      assert.equal(checkDates.size, 1, 'all dates within a week match');

      // all days within a week should be chronologically ordered
      checkDates = week.get('days').map(week => moment(week.get('shiftDate')).valueOf());
      let checkDate = checkDates[0];
      for (let i = 1; i < checkDates.length; i++) {
        assert.ok(checkDates[i] > checkDate, 'day dates are chronological');
        checkDate = checkDates[i];
      }
    });

    assert.equal(firstWeek.get('days.0.shiftDate'), '2015-03-29', 'first shift record in first week is now Sunday, not Monday');
    assert.equal(lastWeek.get('days.0.shiftDate'), '2015-05-03', 'last shift record date matches');
  });
});

test("if weeks are missing from the data then empty weeks should get inserted", function(assert) {
  assert.expect(6);
  const service = this.subject();
  // delete two weeks from the middle of our records
  records.splice(7, 14);

  let weeks = service.getRotaWeeks(records);
  // we should have 5 weeks
  assert.equal(weeks.length, 5, 'we still have five weeks');
  assert.equal(weeks[1].days.length, 0, 'second week has no days');
  assert.equal(weeks[2].days.length, 0, 'third week has no days');

  // delete the first week, and we should be left with just two weeks
  records.splice(0, 7);
  weeks = service.getRotaWeeks(records);
  assert.equal(weeks.length, 2, 'we now have only two weeks');
  // none of them should be empty
  assert.equal(weeks[0].get('days.length'), 7, 'first week is complete');
  assert.equal(weeks[1].get('days.length'), 7, 'second week is complete');
});

test("findOverlapForShift can find matching overlaps", function(assert) {
  assert.expect(5);
  const service = this.subject();

  // add some shifts that will overlap, and some that won't
  records[0].shiftTimes = ['06:00', '12:00'];
  records[1].shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

  let weeks = service.getRotaWeeks(records);
  let fetchedShift = service.getNextShiftFromWeeks(weeks, new Date(2015, 2, 30));
  // first fetched shift should not be in an overlap
  assert.ok(fetchedShift, "we've found a shift for the first day");
  assert.ok(!service.findOverlapForShift(weeks, fetchedShift), 'that shift is not in an overlap');
  // shift fetched for second day should be in an overlap
  fetchedShift = service.getNextShiftFromWeeks(weeks, new Date(2015, 2, 31));
  assert.ok(fetchedShift, "we've found a shift for the second day");
  assert.ok(service.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');

  let recordWeek = service.findWeekForDate(weeks, records[1].get('shiftDate').valueOf());
  let days = recordWeek.days.filter(day => day.get('shiftDateAsMoment').isSame(records[1].get('shiftDateAsMoment'), 'day'));

  assert.equal(fetchedShift, days[0].get('overlappingShifts')[0].shifts[0], "and it's the right one");
});

test('findOverlapForShift deals with gaps', function(assert) {
  assert.expect(2);
  const service = this.subject();

  // delete two weeks from the middle of our records
  records.splice(7, 14);

  // add some overlapping shifts to the last day
  let lastRecord = records[records.length - 1];
  lastRecord.shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

  let weeks = service.getRotaWeeks(records);
  let fetchedShift = service.getNextShiftFromWeeks(weeks, moment(lastRecord.get('shiftDate')));
  assert.ok(fetchedShift, "we've found a shift for the final day");
  assert.ok(service.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');
});

test("getWeekIndexForDate will find the correct index", function(assert) {
  assert.expect(6);
  const service = this.subject();

  let weeks = service.getRotaWeeks(records);

  assert.equal(service.getWeekIndexForDate(weeks, new Date(2015, 2, 30)), 0, 'first date is in first week');
  assert.equal(service.getWeekIndexForDate(weeks, new Date(2015, 3, 2)), 0, 'second date still in first week');
  assert.equal(service.getWeekIndexForDate(weeks, new Date(2015, 3, 6)), 1, 'next monday is in second week');
  assert.equal(service.getWeekIndexForDate(weeks, new Date(2014, 2, 2)), 0, 'dates before range get index zero');
  assert.equal(service.getWeekIndexForDate(weeks, new Date(2017, 1, 1)), 4, 'dates after range get last index');
  assert.equal(service.getWeekIndexForDate([], new Date(2015, 2, 30)), 0, 'no weeks will return zero');
});

test('filler days work as expected', function(assert) {
  assert.expect(2);
  const service = this.subject();

  // delete a few days in the middle of our shifts
  records.splice(10, 3);

  Ember.run(() => {
    // add in an overlap
    let testRecord = records[10];
    testRecord.shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

    // Check it by looking for overlaps on day after our gap, as that requires all to be working
    let weeks = service.getRotaWeeks(records);
    let fetchedShift = service.getNextShiftFromWeeks(weeks, moment(testRecord.get('shiftDate')));
    assert.ok(fetchedShift, "we've found a shift for our test day");
    assert.ok(service.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');
  });
});
