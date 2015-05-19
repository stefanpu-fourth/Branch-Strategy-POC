import ODataAdapter from './odata';
import Filterable from 'ess/mixins/adapter-filterable';

export default ODataAdapter.extend(Filterable, {
  getODataUrlParts(type, query) {
    var {
      filters
    } = query;

    delete query.filters;

    return [
      this.urlPrefix(),
      this.pathForType(type.typeKey),
      '?',
      this.getFiltersString(filters)
    ];
  }
});
