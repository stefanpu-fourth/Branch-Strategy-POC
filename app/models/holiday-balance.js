import DS from 'ember-data';
import i18n from 'ess/i18n';

var attr = DS.attr;
var dayMonthYearFormat = i18n.t('dateFormats.dayMonthYear');

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
    var holidayEnd= moment(holidayStart).subtract(1, 'days').add(1, 'year').format(dayMonthYearFormat);
    return `(${holidayStart.format(dayMonthYearFormat)} - ${holidayEnd})`;
  }.property('holidayYearStartDate')

});

export default HolidayBalance;
