import ODataAdapter from './odata';
import Sortable from 'ess/mixins/adapter-sortable';
import Filterable from 'ess/mixins/adapter-filterable';
import Pageable from 'ess/mixins/adapter-pageable';

export default ODataAdapter.extend(Sortable, Filterable, Pageable, {});
