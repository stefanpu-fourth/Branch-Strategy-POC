import Ember from 'ember';
import ODataAdapter from '../../../adapters/odata';
import AdapterSortableMixin from '../../../mixins/adapter-sortable';
import {
  module, test
}
from 'qunit';

module('AdapterSortableMixin');

var AdapterSortableObject = ODataAdapter.extend(AdapterSortableMixin, {
  host: 'http://localhost:4200',
  namespace: ''
});
var adapter = AdapterSortableObject.create();

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(adapter);
});

test('getQueryStringParts returns an array populated by the sortable mixin', function(assert) {
  var result = adapter.getQueryStringParts({
    typeKey: 'hamster'
  }, {
    sort: {
      by: 'name',
      dir: 'asc'
    }
  }, []);

  assert.deepEqual(result, ['$orderby=Name asc'], 'getQueryStringParts for sortable returns an array with a single entry for $orderby');
});
