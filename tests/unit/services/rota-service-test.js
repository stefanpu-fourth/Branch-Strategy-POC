import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

var store = {};

var RotaSchedule = DS.Model.extend();

moduleFor('service:rota-service', {
  beforeEach: function() {
    var returned = [];
    store.find = sinon.stub().returns(Ember.RSVP.resolve(returned));

    var m = moment(new Date(2015, 2, 30));

    for (let i=0;i<35;i++) {
      returned.push(Ember.Object.create({
        shiftDate: m.format('YYYY-MM-DD')
      }));
      m.add(1, 'day');
    }

    store.filter = function(type, filterFunc) {
      return returned.filter(filterFunc);
    };
  }
});

test('it fetches the appropriate data from the store', function(assert) {
  var service = this.subject({store: store});
  assert.ok(service);
  service.getRotaWeeks(new Date(2015, 3, 2));
  sinon.assert.calledWith(store.find, 'rota-schedule', {
    requestedDate: '2015-04-02', // obviously months are zero based when calling Date.now()...
    numPreviousWeeks: 2,
    numFutureWeeks: 2
  });
});

test('it groups the rotaSchedule objects into rota weeks', function(assert) {
  var service = this.subject({store: store}),
      weeksPromise = service.getRotaWeeks(new Date(2015, 3, 2));

  return weeksPromise.then(weeks => {
    assert.equal(weeks.get('firstObject.start').format('YYYY-MM-DD'), '2015-03-30', 'first shift is present');
    assert.equal(weeks.get('lastObject.start').format('YYYY-MM-DD'), '2015-04-27', 'last shift is present');
    assert.equal(weeks.get('length'), 5, 'expected number of rota weeks loaded');
    weeks.forEach(week => {
      var formattedShiftStart = week.get('start').format('YYYY-MM-DD');
      assert.equal(week.get('shifts.length'), 7, `rota week starting ${formattedShiftStart} is complete`);
    });
  });
});
