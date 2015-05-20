import EssAdapter from './ess';

export default EssAdapter.extend({
  findQuery(store, type, query) {
    return this.ajax(this.buildODataUrl(type, query), 'GET');
  },

  buildODataUrl(type, query) {
    var prefix = this.urlPrefix();
    var pathForType = this.pathForType(type.typeKey);
    var url = `${prefix}/${pathForType}`;
    var params = [];

    this.getQueryStringParts(type, query, params);

    if (params.length) {
      url += `?${params.join('&')}`;
    }

    return url;
  },

  getQueryString(type, query, params) {
    return params;
  }
});
