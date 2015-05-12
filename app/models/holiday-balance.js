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
    var holidayStart=moment(this.get('holidayYearStartDate'));
    var holidayEnd= moment(holidayStart).subtract(1, 'days').add(1, 'year').format('DD MMM YYYY');
    return `(${holidayStart.format('DD MMM YYYY')} - ${holidayEnd})`;
  }.property('holidayYearStartDate')

});

export default HolidayBalance;
