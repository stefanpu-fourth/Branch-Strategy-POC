import EssAdapter from './ess';

export default EssAdapter.extend({
  _buildOdataUrl: function(type, qstring) {
    return `${this.urlPrefix()}/${this.pathForType(type.typeKey)}?${qstring}`;
  },

  findQuery: function(store, type, query) {
    var qstring = '';
    if (query.ProcessingDate) {
      qstring = `$filter=ProcessingDate ge ${query.ProcessingDate}`;
    }
    var url = this._buildOdataUrl(type, qstring);
    return this.ajax(url);
  }
});
