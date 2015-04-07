import Ember from 'ember';
import CardItemMixin from 'ess/mixins/card-item';

export default Ember.Component.extend(CardItemMixin, {
  classNames: ['card', 'payslip']
});
