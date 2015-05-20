import Ember from 'ember';
import ODataAdapter from '../../../adapters/odata';
import AdapterFilterableMixin from '../../../mixins/adapter-filterable';
import {
  module, test
}
from 'qunit';

module('AdapterFilterableMixin');

var AdapterFilterableObject = ODataAdapter.extend(AdapterFilterableMixin, {
  host: 'http://localhost:4200',
  namespace: ''
});
var adapter = AdapterFilterableObject.create();

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(adapter);
});

test('getQueryStringParts returns an array populated by the filterable mixin', function(assert) {
  var result = adapter.getQueryStringParts({
    typeKey: 'hamster'
  }, {
    filters: [{
      key: 'name',
      value: 'Tomster'
    }, {
      key: 'age',
      value: 5,
      operator: 'gte'
    }]
  }, []);

  assert.deepEqual(result, ['$filter=Name eq Tomster and Age gte 5'], 'getQueryStringParts for filterable returns an array with a single entry for $filter');
});

test('getFilterParamString returns a string representing the passed in filter', function(assert) {
  var result = adapter.getFilterParamString('', {
    key: 'age',
    value: 5,
    operator: 'gte'
  }, 0, 1);

  assert.equal(result, 'Age gte 5', 'getFilterParamString returns a string representation of a filter');
});

test('getAndString returns empty string when length is equal to 1 and index is 0', function(assert) {
  assert.equal(adapter.getAndString(1, 0), '', 'getAndString returned empty string');
});

test('getAndString returns " and " string when length is greater than 1 and index is less than length minus 1', function(assert) {
  assert.equal(adapter.getAndString(2, 0), ' and ', 'getAndString returned " and "');
});

test('getAndString returns empty string when length is greater than 1 and index is equal to length minus 1', function(assert) {
  assert.equal(adapter.getAndString(2, 1), '', 'getAndString returned empty string');
});
