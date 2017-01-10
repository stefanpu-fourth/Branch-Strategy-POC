import Ember from 'ember';

/**
  @class HolidayInfo
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property classNames
    @type {String}
    @default holiday-info
    @public
  */
  classNames: 'holiday-info',

  /**
    @property displayReservedHoliday
    @type {Boolean}
    @public
  */
  displayReservedHoliday: Ember.computed.gte('info.reserved', 1)
});
