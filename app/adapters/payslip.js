import ODataAdapter from './odata';
import Sortable from 'ess/mixins/adapter-sortable';
import Filterable from 'ess/mixins/adapter-filterable';
import Pageable from 'ess/mixins/adapter-pageable';

export default ODataAdapter.extend(Sortable, Filterable, Pageable, {
  getODataUrlParts(type, query) {
    var {
      sort, filters, items, page
    } = query;

    delete query.sort;
    delete query.filters;
    delete query.items;
    delete query.page;

    return [
      this.urlPrefix(),
      this.pathForType(type.modelName),
      '?',
      this.getFiltersString(filters),
      this.getSortString(sort.by, sort.dir),
      this.getPaginationString(items, page)
    ];
  },

  // gets round a deprecation without having to change the odata addin
  query(store, type, query) {
    return this.findQuery(store, type, query);
  }
});
