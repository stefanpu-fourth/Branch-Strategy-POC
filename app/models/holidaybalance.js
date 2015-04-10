import DS from 'ember-data';

var attr = DS.attr;

var HolidayBalance = DS.Model.extend({
  allowed: attr('number'),
  booked: attr('number'),
  taken: attr('number'),
  accrued: attr('number'),
  reserved: attr('number'),
  periodHoliday: attr('string'),
  type : attr('string'),
  remaining: attr('number'),

});

HolidayBalance.reopenClass({
  FIXTURES: [{
    id:1,
    allowed: 20,
    booked: 3,
    taken: 4,
    reserved:1,
    accrued: 5,
    periodHoliday:"(01 Jan 2015 - 31 Dec 2015)",
    type : 'Days',
    remaining: 13
  }]
});

export default HolidayBalance;
