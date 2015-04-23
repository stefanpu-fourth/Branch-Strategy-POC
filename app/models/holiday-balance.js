import DS from 'ember-data';

var attr = DS.attr;

var HolidayBalance = DS.Model.extend({
  allowed: attr('number'),
  booked: attr('number'),
  taken: attr('number'),
  accrued: attr('number'),
  reserved: attr('number'),
  holidayYearStartDate: attr('string'),
  type : attr('string'),
  remaining: attr('number'),

  periodHoliday: function() {
    var holidayStart=moment(this.get('holidayYearStartDate')).format('DD MMM YYYY');
    var holidayEnd= moment(holidayStart).subtract(1, 'days').add(1, 'year').format('DD MMM YYYY');
    return `(${holidayStart} - ${holidayEnd})`;
  }.property('holidayYearStartDate')

});

HolidayBalance.reopenClass({
  FIXTURES: [{
    id: 1,
    allowed: 20,
    booked: 3,
    taken: 4,
    reserved: 1,
    accrued: 5,
    holidayYearStartDate: '2015-03-31 00:00:00',
    type : 'Days',
    remaining: 13
  }]
});

export default HolidayBalance;
