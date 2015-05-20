import {
  moduleFor,
  test
}
from 'ember-qunit';
import DS from 'ember-data';

var adapter;
var getQueryStringParts = function(type, query, params) {
  params.push(`$skip=${query.items * (query.page - 1)}&$top=${query.items}`);

  //linear _super chain allows us to pass the params array down and then back up
  return this._super(type, query, params);
};

moduleFor('adapter:odata', 'OdataAdapter', {
  beforeEach: function() {
    adapter = this.subject({
      host: 'http://localhost:4200',
      namespace: ''
    });
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.ok(adapter);
});

test('buildODataUrl returns the url base when query is an empty object', function(assert) {
  var url = adapter.buildODataUrl({
    typeKey: 'hamster'
  }, {});
  assert.equal(url, 'http://localhost:4200/hamsters', 'url is equal to http://localhost:4200/hamster');
});

test('buildODataUrl returns the url base when query is not an empty object (by default)', function(assert) {
  var url = adapter.buildODataUrl({
    typeKey: 'hamster'
  }, {
    items: 10,
    page: 1
  });
  assert.equal(url, 'http://localhost:4200/hamsters', 'url is equal to http://localhost:4200/hamster');
});

test('buildODataUrl returns a parameterised url when query is not an empty object and getQueryStringParts is implemented in the instance', function(assert) {
  adapter.reopen({
    getQueryStringParts: getQueryStringParts
  });

  var url = adapter.buildODataUrl({
    typeKey: 'hamster'
  }, {
    items: 10,
    page: 1
  });

  assert.equal(url, 'http://localhost:4200/hamsters?$skip=0&$top=10');
});

test('getQueryStringParts returns the passed in array', function(assert) {
  var params = [];
  var result = adapter.getQueryStringParts({
    typeKey: 'hamster'
  }, {
    items: 10,
    page: 1
  }, params);

  assert.equal(result, params, 'result is equal to params array that was passed in to getQueryStringParts');
});

test('getQueryStringParts returns the same array but populated when getQueryStringParts is implemented in the instance', function(assert) {
  adapter.reopen({
    getQueryStringParts: getQueryStringParts
  });

  var params = [];
  var result = adapter.getQueryStringParts({
    typeKey: 'hamster'
  }, {
    items: 10,
    page: 1
  }, params);

  assert.deepEqual(result, ['$skip=0&$top=10'], 'result is equal to an array containing the query string parts');
});
