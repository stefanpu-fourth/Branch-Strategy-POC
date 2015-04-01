import Ember from 'ember';

export default Ember.Route.extend({

    model: function () {
        return this.store.find('paysliplineitem');
    },

    setupController: function (controller, model) {
        controller.set('attrs.lineitems', model);
    }

});
