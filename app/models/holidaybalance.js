import DS from 'ember-data';

var attr = DS.attr;

var HolidayBalance = DS.Model.extend({
  Allowed: attr('number'),
  Booked: attr('number'),
  Taken: attr('number'),
  Accrued: attr('number'),
  Reserved: attr('number'),
  periodHoliday: attr('string'),
  Type : attr('string'),
  Remaining: attr('number'),

});

HolidayBalance.reopenClass({
  FIXTURES: [{
    id:1,
    Allowed: 20,
    Booked: 3,
    Taken: 4,
    Reserved:1,
    Accrued: 5,
    periodHoliday:"(01 Jan 2015 - 31 Dec 2015)",
    Type : 'Days',
    Remaining: 13
  }]
});

export default HolidayBalance;
