import {
  moduleFor,
  test
}
from 'ember-qunit';

import Ember from 'ember';
import DS from 'ember-data';
import RotaSchedule from 'ess/models/rota-schedule';

var store = {};
var records;

moduleFor('service:rota-service', {
  beforeEach: function() {
    var container = this.container;

    if (!container.lookup('store:main')) {
      DS._setupContainer(container);
    }

    store = container.lookup('store:main');
    container.register('model:rota-schedule', RotaSchedule);
    records = [];
    store.find = sinon.stub().returns(Ember.RSVP.resolve(records));

    var m = moment(new Date(2015, 2, 30));

    for (let i = 0; i < 35; i++) {
      let rotaStart = m.clone().startOf('week').add(1, 'days').format('YYYY-MM-DD');
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
  var service = this.subject();
  var weeks = service.getRotaWeeks(records, new Date(2015, 3, 2));

  assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first week is present');
  assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last week is present');
  assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
  weeks.forEach(week => {
    var formattedShiftStart = week.get('start').format('YYYY-MM-DD');
    assert.equal(week.get('shifts.length'), 7, `rota week starting ${formattedShiftStart} is complete`);
  });
});

test('it consolidates days in rota weeks', function(assert) {
  var service = this.subject();

  Ember.run(() => {
    // first up add in a shift on a day
    var record = records.get(4);
    record.shiftTimes = ['0700', '1300'];

    var shiftDate = record.get('shiftDate');
    var rotaStart = record.get('rotaStart');

    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['1400', '1500']
    }));
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['1600', '1700']
    }));

    record = records.get(20);
    shiftDate = record.get('shiftDate');
    rotaStart = record.get('rotaStart');
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['1400', '1500']
    }));
    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['1600', '1700']
    }));

    records.forEach(day => {
      day.calculateShifts();
    });

    var weeks = service.getRotaWeeks(records, new Date(2015, 3, 2));

    assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first shift is present');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last shift is present');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    weeks.forEach(week => {
      var formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('shifts.length'), 7, `rota week starting ${formattedShiftStart} is complete`);
    });

    assert.equal(record.shifts.length, 2, 'shifts get merged as expected');

    weeks = service.getRotaWeeks(records, new Date(2015, 3, 2));
    assert.equal(record.shifts.length, 2, 'shifts merged as expected after second call to getRotaWeeks');
  });
});

test('it can get the next shift when there is one', function(assert) {
  var service = this.subject();

  // add a shift to a record in the future
  var record = records.get(20);
  record.shiftTimes = ['0700', '1300'];

  // and add a shift to a record in the past
  record = records.get(1);
  record.shiftTimes = ['0600', '1200'];

  records.forEach(day => {
    day.calculateShifts();
  });

  var fetchedShift = service.getNextShift(records, new Date(2015, 3, 2));

  // fetched shift should be the future one
  assert.equal(fetchedShift.start, '0700');
  assert.equal(fetchedShift.end, '1300');

});

test("won't return a next shift when there isn't one", function(assert) {
  var service = this.subject();

  var fetchedShift = service.getNextShift(records, new Date(2015, 3, 2));
  assert.equal(fetchedShift, undefined);
});

test("merged schedules correctly sort their shifts", function(assert) {
  var service = this.subject();

  // add a shift to a record late in the day
  var record = records.get(20);
  record.shiftTimes = ['1400', '2000'];

  var shiftDate = record.get('shiftDate');
  var rotaStart = record.get('rotaStart');

  Ember.run(() => {
    // add a shift record on the same day with the shift we're searching for
    // this is the shift we'll be looking for

    records.push(store.createRecord('rota-schedule', {
      rotaStart: rotaStart,
      shiftDate: shiftDate,
      shiftTimes: ['0700', '1200']
    }));

    // and add a shift to a record in the past
    record = records.get(1);
    record.shiftTimes = ['0600', '1200'];

    records.forEach(day => {
      day.calculateShifts();
    });

    var fetchedShift = service.getNextShift(records, shiftDate);

    // fetched shift should be one from the merged-in record
    assert.equal(fetchedShift.start, '0700');
    assert.equal(fetchedShift.end, '1200');
  });
});

test("our first week will have only 6 days if our week starts on Sunday", function(assert) {
  assert.expect(5);

  Ember.run(() => {
    // adjust all our records to have their rotaStart days back a day, moving them from Monday to Sunday
    records.forEach(function(shift) {
      shift.set('rotaStart', moment(shift.get('rotaStart')).subtract(1, 'days').format('YYYY-MM-DD'));
    });

    var service = this.subject({ store: store });
    var weeks = service.getRotaWeeks(records, new Date(2015, 3, 2));

    var firstWeek = weeks.get('firstObject');
    assert.equal(firstWeek.get('start').format('YYYY-MM-DD'), '2015-03-29', 'first week is present, and now starts on Sunday 29 March');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-26', 'last week is present, and now starts on Sunday 26 April');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    assert.equal(firstWeek.get('shifts.length'), 6, 'first week has only 6 shifts');
    assert.equal(firstWeek.get('shifts.0.shiftDate'), '2015-03-30', 'first shift record in first week is still Monday');
  });
});
