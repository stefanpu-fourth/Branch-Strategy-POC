import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Week from '../../../models/week';

let store, records;

moduleFor('model:week', 'Unit | Model | week', {
  // Specify the other units that are required for this test.
  needs: ['model:rota-schedule'],

  beforeEach() {
    let container = this.container;
    store = container.lookup('service:store');
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
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('end date is a moment 6 days from start', function(assert) {
  assert.expect(1);

  let model = this.subject({ start: '2015-12-28' });
  assert.equal(model.get('end').format('YYYY-MM-DD'), '2016-01-03', 'End date is as expected');
});

test('formattedDateRange property formats dates as desired', function(assert) {
  assert.expect(1);

  let model = this.subject({ start: '2015-12-28' });
  assert.equal(model.get('formattedDateRange'), '28 Dec - 3 Jan', 'formatted date range is as expected');
});

test('weeksFromSchedules groups rotaSchedule records into weeks', function(assert) {
  assert.expect(3 + (5 * 2));

  Ember.run(() => {
    let weeks = Week.weeksFromSchedules(records);

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

test('findWeekForDate will find week for a date, if there is one', function(assert) {
  assert.expect(4);

  Ember.run(() => {
    let weeks = Week.weeksFromSchedules(records);

    let foundWeek = Week.findWeekForDate(weeks, '2015-04-07');
    assert.equal(foundWeek, weeks[1], 'Week found is correct');

    foundWeek = Week.findWeekForDate(weeks, '2014-01-01');
    assert.equal(foundWeek, undefined, 'No week found for 1st Jan 2014 (before our test records)');

    foundWeek = Week.findWeekForDate(weeks, '2016-01-01');
    assert.equal(foundWeek, undefined, 'No week found for 1st Jan 2016 (after our test records)');

    foundWeek = Week.findWeekForDate([], '2016-01-01');
    assert.equal(foundWeek, undefined, 'No week found when no weeks given');
  });
});
