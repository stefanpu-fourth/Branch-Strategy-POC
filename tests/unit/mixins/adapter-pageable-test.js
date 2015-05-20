import Ember from 'ember';
import ODataAdapter from '../../../adapters/odata';
import AdapterPageableMixin from '../../../mixins/adapter-pageable';
import {
  module, test
}
from 'qunit';

module('AdapterPageableMixin');

var AdapterPageableObject = ODataAdapter.extend(AdapterPageableMixin, {
  host: 'http://localhost:4200',
  namespace: ''
});
var adapter = AdapterPageableObject.create();

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(adapter);
});

test('getQueryStringParts returns an array populated by the pageable mixin', function(assert) {
  var result = adapter.getQueryStringParts({
    typeKey: 'hamster'
  }, {
    items: 10,
    page: 1
  }, []);

  assert.deepEqual(result, ['$skip=0&$top=10'], 'getQueryStringParts for sortable returns an array with a single entry for $skip and $top');
});
