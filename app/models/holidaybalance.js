import DS from 'ember-data';

var attr = DS.attr;

var HolidayBalance = DS.Model.extend({
  allowedHoliday: attr('number'),
  bookedHoliday: attr('number'),
  takenHoliday: attr('number'),
  accruedHoliday: attr('number'),
  reservedHoliday: attr('number'),
  periodHoliday: attr('string'),

  remainingHoliday: function () {
    return this.get('allowedHoliday')-(this.get('takenHoliday')+this.get('bookedHoliday'));
  }.property('allowedHoliday','takenHoliday')
});

HolidayBalance.reopenClass({
  FIXTURES: [{
    id:1,
    allowedHoliday: 20,
    bookedHoliday: 3,
    takenHoliday: 4,
    reservedHoliday:1,
    accruedHoliday: 5,
    periodHoliday:"(01 Jan - 31 Dec 2015)"
  }]
});

export default HolidayBalance;
