import Ember from 'ember';
import i18n from 'ess/i18n';

export default Ember.Component.extend({
  titles: Ember.computed(() => {
    const titlesArr = i18n.t('details.employee.titles');
    titlesArr.unshift('');

    return titlesArr;
  })
});
