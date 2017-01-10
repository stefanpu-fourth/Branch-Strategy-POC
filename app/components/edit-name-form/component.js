import Ember from 'ember';
import i18n from 'ess/i18n';

/**
  @class EditNameForm
  @extends Ember.Component
  @module Components
  @public
*/
export default Ember.Component.extend({
  /**
    @property titles
    @type {Array}
    @public
  */
  titles: Ember.computed(function () {
    const titlesArr = Array.from(i18n.t('details.employee.titles'));

    // Add default selected title
    titlesArr.unshift('');

    return titlesArr;
  })
});
