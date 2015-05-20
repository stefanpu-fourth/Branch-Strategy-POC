import Ember from 'ember';

export default Ember.Mixin.create({

  getQueryStringParts(type, query, params) {
    var { sort } = query;
    var { by, dir } = sort;

    if (by) {
      params.push(`$orderby=${by.capitalize()} ${dir || 'desc'}`);
    }

    return this._super(type, query, params);
  }
});
