import Ember from 'ember';

var paramParams = {
  refreshModel: true,
  replace: true
};

export default Ember.Mixin.create({
  queryParams: {
    page: paramParams,
    items: paramParams
  }
});
