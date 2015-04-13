import Ember from 'ember';
import CardItemMixin from 'ess/mixins/card-item';

export default Ember.Component.extend(CardItemMixin, {
  tagName: 'ul',

  classNames: ['rota__week']
});
