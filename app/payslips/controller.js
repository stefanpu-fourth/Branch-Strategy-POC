import Ember from 'ember';

var PayslipContainer = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: ['processingDate']
});

export default Ember.Controller.extend({
  attrs: {
    payslips: PayslipContainer.create()
  }
});
