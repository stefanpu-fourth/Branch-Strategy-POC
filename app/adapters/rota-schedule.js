import EssAdapter from './ess';

export default EssAdapter.extend({
  _buildOdataUrl: function(type, qstring) {
    return `${this.urlPrefix()}/${this.pathForType(type.modelName).toLowerCase()}?${qstring}`;
  },

  query: function(store, type, query) {
    var qstring = '';
    if (query.RequestDate) {
      qstring = `$filter=RequestDate eq ${query.RequestDate} and NoPreviousWeeks eq 2 and NoFutureWeeks eq 2`;
    }
    var url = this._buildOdataUrl(type, qstring);
    return this.ajax(url);
  }
});
