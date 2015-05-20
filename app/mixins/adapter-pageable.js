import Ember from 'ember';

export default Ember.Mixin.create({
  getQueryStringParts(type, query, params) {
    var items = query.items;
    var page = query.page;

    if (!isNaN(items) && !isNaN(page)) {
      params.push(`$skip=${+items * (+page - 1)}&$top=${items}`);
    }

    return this._super(type, query, params);
  }
});
