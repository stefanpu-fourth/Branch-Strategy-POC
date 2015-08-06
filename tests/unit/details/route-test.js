import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:details', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:appStateService']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
