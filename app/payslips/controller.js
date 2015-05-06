import Ember from 'ember';
import Pageable from 'ess/mixins/controller-pageable';

var PayslipContainer = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: ['processingDate']
});

export default Ember.Controller.extend(Pageable, {
  attrs: {
    payslips: PayslipContainer.create()
  }
});
