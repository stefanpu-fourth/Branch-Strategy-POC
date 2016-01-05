import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Week from '../../../models/week';

let store, records;

moduleFor('model:week', 'Unit | Model | week', {
  // Specify the other units that are required for this test.
  needs: ['model:rota-schedule'],

  beforeEach() {
    const container = this.container;
    store = container.lookup('service:store');
    records = [];

    // we're starting our shifts from Monday 30th March
    const m = moment(new Date(2015, 2, 30));

    for (let i = 0; i < 35; i++) {
      // rotaStart date for test data will be Mondays
      // to get that to work properly, we need to subtract the offset, get the week start, then add that offset
      const rotaStart = m.clone().subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD');
      records.push(store.createRecord('rota-schedule', {
        rotaStart: rotaStart,
        shiftDate: m.format('YYYY-MM-DD')
      }));
      m.add(1, 'day');
    }

    window.I18n.translations = {
      en: {
        dateFormats: {
          dayMonth: 'D MMM'
        }
      }
    };
  }
});

test('it exists', function(assert) {
  const model = this.subject();

  assert.ok(!!model);
});

test('end date is a moment 6 days from start', function(assert) {
  assert.expect(1);

  const model = this.subject({ start: '2015-12-28' });
  assert.equal(model.get('end').format('YYYY-MM-DD'), '2016-01-03', 'End date is as expected');
});

test('formattedDateRange property formats dates as desired', function(assert) {
  assert.expect(1);

  const model = this.subject({ start: '2015-12-28' });
  assert.equal(model.get('formattedDateRange'), '28 Dec - 3 Jan', 'formatted date range is as expected');
});

test('weeksFromSchedules groups rotaSchedule records into weeks', function(assert) {
  assert.expect(3 + (5 * 2));

  const weeks = Week.weeksFromSchedules(records);

  assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first week is present');
  assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last week is present');
  assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
  weeks.forEach(week => {
    const formattedShiftStart = week.get('start').format('YYYY-MM-DD');
    assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);

    // days of week should all have matching rotaStart days
    const startDates = new Set(week.get('days').map(w => w.get('rotaStart')));
    assert.equal(startDates.size, 1, 'all dates within a week match');
  });
});

test('weeksFromSchedules consolidates days/weeks from rota-schedule records', function(assert) {
  assert.expect(14);

  Ember.run(() => {
    // first up add in a shift on a day
    let record = records.get(4);
    record.shiftTimes = ['07:00', '13:00'];

    let shiftDate = record.get('shiftDate');
    let rotaStart = record.get('rotaStart');

    // add two more rota-schedule records for that same day with more shifts
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

    let weeks = Week.weeksFromSchedules(records);

    assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first shift is present');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last shift is present');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    weeks.forEach(week => {
      let formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);
    });

    // check day matching record 4
    let dayFilter = day => day.get('shiftDateAsMoment').isSame(shiftDate, 'day');
    let recordWeek = Week.findWeekForDate(weeks, shiftDate);
    let days = recordWeek.days.filter(dayFilter);

    assert.equal(days.length, 1, `single day for merged shifts on ${shiftDate} found`);
    assert.equal(days[0].shifts.length, 3, `shifts get merged on ${shiftDate} as expected`);

    // add more rota-schedule records with shifts matching another
    // rota-schedule (day) that has no shifts
    record = records.get(20);
    shiftDate = record.get('shiftDate');
    rotaStart = record.get('rotaStart');

    // before we add new records, check this day has no shifts
    recordWeek = Week.findWeekForDate(weeks, shiftDate);
    days = recordWeek.days.filter(dayFilter);

    assert.equal(days.length, 1, `single day for ${shiftDate} found`);
    assert.equal(days[0].shifts.length, 0, `no shifts found on ${shiftDate}, as expected`);

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

    // re-calculate our weeks after adding these new records
    weeks = Week.weeksFromSchedules(records);

    // find day that matching date of record 20
    recordWeek = Week.findWeekForDate(weeks, shiftDate);
    days = recordWeek.days.filter(dayFilter);

    assert.equal(days.length, 1, `single day for merged shifts on ${shiftDate} found`);
    assert.equal(days[0].shifts.length, 2, `shifts got merged on ${shiftDate} as expected`);
  });
});

test('weeksFromSchedules will insert empty weeks if weeks are missing from the data', function(assert) {
  assert.expect(6);

  // delete two weeks from the middle of our records
  records.splice(7, 14);

  let weeks = Week.weeksFromSchedules(records);

  // we should have 5 weeks
  assert.equal(weeks.length, 5, 'we still have five weeks');
  assert.equal(weeks[1].days.length, 0, 'second week has no days');
  assert.equal(weeks[2].days.length, 0, 'third week has no days');

  // delete the first week, and we should be left with just two weeks
  records.splice(0, 7);
  weeks = Week.weeksFromSchedules(records);
  assert.equal(weeks.length, 2, 'we now have only two weeks');
  // none of them should be empty
  assert.equal(weeks[0].get('days.length'), 7, 'first week is complete');
  assert.equal(weeks[1].get('days.length'), 7, 'second week is complete');
});

test('weeksFromSchedules inserts empty days into weeks if those days were missing', function(assert) {
  assert.expect(5 + (2 * 5));

  // delete a chunk of data from the middle of our records
  records.splice(22, 3);
  records.splice(6, 5);

  let weeks = Week.weeksFromSchedules(records);

  assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first week is present');
  assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last week is present');
  assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
  weeks.forEach(week => {
    const weekStart = week.get('start');
    const formattedShiftStart = weekStart.format('YYYY-MM-DD');
    assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);

    // days of week should all be within a week of weekStart
    const dayDiffs = week.get('days').map(day => weekStart.diff(day.get('shiftDate'), 'days'));
    assert.ok((Math.max(...dayDiffs) <= 0) && (Math.min(...dayDiffs) > -7), 'all dates within a week');
  });

  // delete a few more records so we get a missing week, which should be empty
  records.splice(6, 3);
  weeks = Week.weeksFromSchedules(records);

  assert.equal(weeks.length, 5, 'we still have five weeks');
  assert.equal(weeks[1].days.length, 0, 'second week has no days');
});

test('weeksFromSchedules still works as expected if our week starts on Sunday', function(assert) {
  assert.expect(5 + (6 * (2 + 6)));   // 5 tests, plus for each week there's two for the week and 6 for days

  Ember.run(() => {
    // adjust all our records to have their rotaStart days back a day, moving them from Monday to Sunday
    records.forEach(function(schedule) {
      const rotaStart = moment(schedule.get('shiftDate')).clone().startOf('week');
      schedule.set('rotaStart', rotaStart.format('YYYY-MM-DD'));
    });

    const weeks = Week.weeksFromSchedules(records);

    const firstWeek = weeks.get('firstObject');
    const lastWeek = weeks.get('lastObject');
    assert.equal(firstWeek.get('start').format('YYYY-MM-DD'), '2015-03-29', 'first week is present, and now starts on Sunday 29 March');
    assert.equal(lastWeek.get('start').format('YYYY-MM-DD'), '2015-05-03', 'last week is present, and now starts on Sunday 3 May');
    // as we've shifted the start day we'll now have an extra week
    assert.equal(weeks.get('length'), 6, 'expected number of rota weeks loaded');

    // new logic means that all weeks should still have 7 days
    weeks.forEach(week => {
      const weekStart = week.get('start');
      const formattedShiftStart = weekStart.format('YYYY-MM-DD');
      assert.equal(week.get('days.length'), 7, `rota week starting ${formattedShiftStart} is complete`);

      // days of week should all be within a week of weekStart
      const dayDiffs = week.get('days').map(day => weekStart.diff(day.get('shiftDate'), 'days'));
      assert.ok((Math.max(...dayDiffs) <= 0) && (Math.min(...dayDiffs) > -7), 'all dates within a week');

      // all days within a week should be chronologically ordered
      const checkDates = week.get('days').map(week => moment(week.get('shiftDate')).valueOf());
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

test('findWeekForDate will find week for a date, if there is one', function(assert) {
  assert.expect(6);

  const weeks = Week.weeksFromSchedules(records);

  assert.equal(Week.findWeekForDate(weeks, '2015-04-07'), weeks[1], 'Week found is correct');
  assert.equal(Week.findWeekForDate(weeks, new Date(2015, 3, 14)), weeks[2], 'Found week using JS Date');
  assert.equal(Week.findWeekForDate(weeks, moment('2015-04-21')), weeks[3], 'Found week using a moment');
  assert.equal(Week.findWeekForDate(weeks, '2014-01-01'), undefined, 'No week found for 1st Jan 2014 (before our test records)');
  assert.equal(Week.findWeekForDate(weeks, '2016-01-01'), undefined, 'No week found for 1st Jan 2016 (after our test records)');
  assert.equal(Week.findWeekForDate([], '2016-01-01'), undefined, 'No week found when no weeks given');
});

test('getWeekIndexForDate will find the correct index', function(assert) {
  assert.expect(8);

  const weeks = Week.weeksFromSchedules(records);

  assert.equal(Week.getWeekIndexForDate(weeks, new Date(2015, 2, 30)), 0, 'first date is in first week');
  assert.equal(Week.getWeekIndexForDate(weeks, new Date(2015, 3, 2)), 0, 'second date still in first week');
  assert.equal(Week.getWeekIndexForDate(weeks, new Date(2015, 3, 6)), 1, 'next monday is in second week');
  assert.equal(Week.getWeekIndexForDate(weeks, new Date(2014, 2, 2)), 0, 'dates before range get index zero');
  assert.equal(Week.getWeekIndexForDate(weeks, new Date(2017, 1, 1)), 4, 'dates after range get last index');
  assert.equal(Week.getWeekIndexForDate([], new Date(2015, 2, 30)), 0, 'no weeks will return zero');
  assert.equal(Week.getWeekIndexForDate(weeks, '2015-04-14'), 2, 'found index using string date');
  assert.equal(Week.getWeekIndexForDate(weeks, moment('2015-04-21')), 3, 'found index using moment');
});

test('getNextShiftFromWeeks can find next shift when there is one', function(assert) {
  assert.expect(4);

  // add a shift to a record in the future
  let record = records.get(20);
  record.shiftTimes = ['07:00', '13:00'];

  // and add a shift to a record in the past
  record = records.get(1);
  record.shiftTimes = ['06:00', '12:00'];

  const weeks = Week.weeksFromSchedules(records);
  const fetchedShift = Week.getNextShiftFromWeeks(weeks, new Date(2015, 3, 2));

  // fetched shift should be the future one
  assert.equal(fetchedShift.start, '07:00', 'Start time for found shift matches');
  assert.equal(fetchedShift.end, '13:00', 'End time for found shift matches too');

  // getNextShiftFromWeeks also works with date as a string
  const stringFetchedShift = Week.getNextShiftFromWeeks(weeks, '2015-04-02');

  assert.equal(fetchedShift, stringFetchedShift, 'Shift fetched with a string date matched');

  // and with a moment
  const momentFetchedShift = Week.getNextShiftFromWeeks(weeks, moment('2015-04-02'));
  assert.equal(fetchedShift, momentFetchedShift, 'Shift fetched with a moment matched');
});

test("getNextShiftFromWeeks won't return a shift when there isn't any", function(assert) {
  assert.expect(1);

  const weeks = Week.weeksFromSchedules(records);
  const fetchedShift = Week.getNextShiftFromWeeks(weeks, new Date(2015, 3, 2));

  assert.equal(fetchedShift, undefined, 'No shift found when no shifts provided');
});

test("getNextShiftFromWeeks doesn't find a shifts from the past", function(assert) {
  assert.expect(1);

  // add a shift to a record in the past
  const record = records.get(1);
  record.shiftTimes = ['06:00', '12:00'];

  const weeks = Week.weeksFromSchedules(records);
  const fetchedShift = Week.getNextShiftFromWeeks(weeks, new Date(2015, 3, 2));

  assert.equal(fetchedShift, undefined, 'No shift found when shifts in the past provided');
});

test('getNextShiftFromWeeks will match a shift in progress', function(assert) {
  assert.expect(2);

  // add a shift to a record
  const record = records.get(15);
  record.shiftTimes = ['06:00', '12:00'];

  const weeks = Week.weeksFromSchedules(records);
  const checkTime = moment(record.get('shiftDate')).hour(7);
  let fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(fetchedShift, 'Shift was found');

  checkTime.hour(12);
  fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(!fetchedShift, 'Shift not found when at end time');
});

test('getNextShiftFromWeeks can match a shift spanning midnight, and spanning week end', function(assert) {
  assert.expect(4);

  // add a shift to a record that spans midnight (on the final day of week 2)
  const record = records.get(13);
  record.shiftTimes = ['21:00', '03:00'];

  const weeks = Week.weeksFromSchedules(records);
  const checkTime = moment(record.get('shiftDate')).hour(7);
  let fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(fetchedShift, 'Checking at 7am, shift was found');

  checkTime.hour(22);
  fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(fetchedShift, 'Checking at 10pm, after shift started, shift was found');

  checkTime.hour(1);
  checkTime.add(1, 'day');
  fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(fetchedShift, 'Checking at 1am, after shift started, shift was found');

  checkTime.hour(3);
  fetchedShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(!fetchedShift, 'Shift not found when checking at 3am, when shift ends');
});

test('getNextShiftFromWeeks can find multiple shifts on a single day', function(assert) {
  assert.expect(9);

  const record = records.get(19);
  const checkTime = moment(record.get('shiftDate'));
  // set some shiftTimes - done out of sequence as order shouldn't matter
  record.shiftTimes = ['12:00', '14:00', '09:00', '11:00', '17:00', '19:00'];

  const weeks = Week.weeksFromSchedules(records);
  const firstShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.ok(firstShift, 'shift found');
  assert.equal(firstShift.start, '09:00', 'at correct start time');

  checkTime.hour(10);
  let checkShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.equal(checkShift, firstShift, 'still matches at 10am');

  checkTime.hour(11);
  checkShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.notEqual(checkShift, firstShift, 'at 11am match changes');
  assert.ok(checkShift, 'finding the next shift');
  assert.equal(checkShift.start, '12:00', 'which starts at 12 noon');

  checkTime.hour(13);
  checkShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.equal(checkShift.start, '12:00', 'at 1pm we still find the 12 noon shift');

  checkTime.hour(18);
  checkShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.equal(checkShift.start, '17:00', 'at 6pm we find the 5pm shift');

  checkTime.hour(19);
  checkShift = Week.getNextShiftFromWeeks(weeks, checkTime);

  assert.notOk(checkShift, 'at 7pm we no longer find a shift');
});

test('findOverlapForShift can find matching overlaps', function(assert) {
  assert.expect(5);

  // add some shifts that will overlap, and some that won't
  records[0].shiftTimes = ['06:00', '12:00'];
  records[1].shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

  const weeks = Week.weeksFromSchedules(records);
  let fetchedShift = Week.getNextShiftFromWeeks(weeks, new Date(2015, 2, 30));
  // first fetched shift should not be in an overlap
  assert.ok(fetchedShift, "we've found a shift for the first day");
  assert.ok(!Week.findOverlapForShift(weeks, fetchedShift), 'that shift is not in an overlap');
  // shift fetched for second day should be in an overlap
  fetchedShift = Week.getNextShiftFromWeeks(weeks, new Date(2015, 2, 31));
  assert.ok(fetchedShift, "we've found a shift for the second day");
  assert.ok(Week.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');

  const recordWeek = Week.findWeekForDate(weeks, records[1].get('shiftDate').valueOf());
  const days = recordWeek.days.filter(day => day.get('shiftDateAsMoment').isSame(records[1].get('shiftDateAsMoment'), 'day'));

  assert.equal(fetchedShift, days[0].get('overlappingShifts')[0].shifts[0], "and it's the right one");
});

test('findOverlapForShift deals with gaps', function(assert) {
  assert.expect(2);

  // delete two weeks from the middle of our records
  records.splice(7, 14);

  // add some overlapping shifts to the last day
  const lastRecord = records[records.length - 1];
  lastRecord.shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

  const weeks = Week.weeksFromSchedules(records);
  const fetchedShift = Week.getNextShiftFromWeeks(weeks, moment(lastRecord.get('shiftDate')));
  assert.ok(fetchedShift, "we've found a shift for the final day");
  assert.ok(Week.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');
});

test('filler days work as expected', function(assert) {
  assert.expect(2);

  // delete a few days in the middle of our shifts
  records.splice(10, 3);

  // add in an overlap
  const testRecord = records[10];
  testRecord.shiftTimes = ['06:00', '12:00', '06:00', '12:00'];

  // Check it by looking for overlaps on day after our gap, as that requires all to be working
  const weeks = Week.weeksFromSchedules(records);
  const fetchedShift = Week.getNextShiftFromWeeks(weeks, moment(testRecord.get('shiftDate')));
  assert.ok(fetchedShift, "we've found a shift for our test day");
  assert.ok(Week.findOverlapForShift(weeks, fetchedShift), 'that shift is in an overlap');
});
