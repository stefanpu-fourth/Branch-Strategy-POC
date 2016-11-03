import Ember from 'ember';
import i18n from 'ess/i18n';

const titlesArr = i18n.t('details.employee.titles');
titlesArr.unshift('');

export default Ember.Component.extend({
  titles: titlesArr
});
