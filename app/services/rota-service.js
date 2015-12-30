import Ember from 'ember';
import Week from 'ess/models/week';

export default Ember.Service.extend({

  getRotaWeeks: function(schedules, meta) {
    return Week.weeksFromSchedules(schedules, meta);
  },

  // utility method to check if a shift is in an overlap
  // and return the first overlap the shift belongs to
  findOverlapForShift: function(weeks, shift) {
    var overlapFilter = function(overlap) {
      return overlap.shifts.contains(shift);
    };
    for (let i = 0; i < weeks.length; i++) {
      let week = weeks[i];
      let days = week.get('days');
      for (let day = 0; day < days.length; day++) {
        // check the shift to see if it's in the overlappingShifts for the day
        let overlaps = days[day].get('overlappingShifts').filter(overlapFilter);
        if (overlaps && (overlaps.length !== 0)) {
          return overlaps[0];
        }
      }
    }
  }
});
