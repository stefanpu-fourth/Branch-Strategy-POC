import ODataAdapter from './odata';
import Sortable from 'ess/mixins/adapter-sortable';

export default ODataAdapter.extend(Sortable, {

  getODataUrlParts(type, query) {
      var { sort } = query;

      delete query.sort;

      return [
          this.urlPrefix(),
          this.pathForType(type.typeKey),
          '?',
          this.getSortString(sort.by, sort.dir)
      ];
  }

  /*_buildOdataUrl: function(type, qstring) {
    return `${this.urlPrefix()}/${this.pathForType(type.typeKey)}?${qstring}`;
  },

  findQuery: function(store, type, query) {
    var qstring = '';
    if (query.ProcessingDate) {
      qstring = `$filter=ProcessingDate ge ${query.ProcessingDate}`;
    }
    var url = this._buildOdataUrl(type, qstring);
    return this.ajax(url);
  }*/
});
