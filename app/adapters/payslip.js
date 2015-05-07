import ODataAdapter from './odata';
import Sortable from 'ess/mixins/adapter-sortable';
import Filterable from 'ess/mixins/adapter-filterable';

export default ODataAdapter.extend(Sortable, Filterable, {

  getODataUrlParts(type, query) {
      var { sort, filters } = query;

      delete query.sort;
      delete query.filters;

      return [
          this.urlPrefix(),
          this.pathForType(type.typeKey),
          '?',
          this.getFiltersString(filters),
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
